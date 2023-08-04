import ServerFacade from './ServerFacade';
import LocalDb from '../LocalDatabase/LocalDatabase';
import Survey from 'src/model/archive/Survey/Survey';
import Submission from 'src/model/archive/Survey/Submission';
import Journal from 'src/model/archive/Journal/Journal';
import StorableUser from 'src/model/User/StorableUser';
import Entry from 'src/model/archive/Journal/Entry';
import createLogger from 'src/utils/createLogger';
import JournalTemplate from '../Journal/JournalTemplate';

export default class ServerAdapter {
  /* ------------------ Survey operations ------------------ */
  // Fetch all available surveys from the server in a form that is usable by the front-end
  static fetchAllSurveys = async () => {
    const [log, end] = createLogger('ServerAdapter.fetchAllSurveys()');
    try {
      log('Attempting to batch fetch surveys...');
      const surveys = await ServerFacade.getAllSurveys();
      if (!surveys) {
        end('Batch fetching of surveys unsuccessful.');
        return null;
      }

      const decoded = surveys.map((survey) => Survey.fromStorable(survey));
      log('Batch fetching & decoding of surveys successful. Decoded surveys:');
      end(decoded);
      return decoded;
    } catch (err) {
      log('Batch fetching & decoding of surveys unsuccessful.');
      end(err);
      return null;
    }
  };

  /**
   * Requires a user to be logged in. Fetches all available surveys and stores them into local storage.
   */
  static fetchAndStoreSurveys = async (): Promise<void> => {
    const [log, end, err] = createLogger(
      'ServeyAdapter.fetchAndStoreSurveys()'
    );

    const surveys = await this.fetchAllSurveys();
    if (!surveys) {
      return;
    }

    await LocalDb.deleteAllSurveys();
    await LocalDb.bulkPutSurveys(surveys);
  };

  /**
   * Fetch the latest version of a particular survey in a form that is usable by the front-end
   * @param {string} surveyId The ID of the survey to fetch
   * @returns {Promise<Survey | null>}
   */
  static fetchSurvey = async (surveyId: string) => {
    const [log, end] = createLogger('ServerAdapter.fetchAllSurveys()');

    try {
      log('Attempting to retrieve a survey...');
      const survey = await ServerFacade.getSurvey(surveyId);
      if (!survey) {
        end('Fetching & decoding of a survey unsuccessful.');
        return null;
      }

      const decoded = Survey.fromStorable(survey);
      log('Fetching & decoding of a survey successful. Decoded survey:');
      end(decoded);
      return decoded;
    } catch (err) {
      log('Fetching & decoding of a survey unsuccessful.');
      end(err);
      return null;
    }
  };

  /* ------------------ Admin survey operations ------------------ */
  // Create a new Survey
  static createSurvey = async () => {
    const [log, end] = createLogger('ServerAdapter.createSurvey()');
    try {
      const blankSurveyData = await ServerFacade.createSurvey();
      if (!blankSurveyData) {
        return null;
      }

      const newSurvey = Survey.fromStorable(blankSurveyData);
      log('Survey creation & decoding successful. New survey data: ');
      end(newSurvey);
      return newSurvey;
    } catch (err) {
      log('Survey creation or decoding unsuccessful');
      return null;
    }
  };

  // Update an existing survey
  // The given survey data must be given in a Survey object
  static updateSurvey = async (survey: Survey) => {
    const [log, end] = createLogger('ServerAdapter.updateSurvey()');
    try {
      log('Attmpting to update survey...');
      const updatedSurvey = await ServerFacade.updateSurvey(
        survey.toStorable(),
        survey.id
      );
      if (!updatedSurvey) {
        end('Error.');
        return null;
      }

      const decoded = Survey.fromStorable(updatedSurvey);
      log('Survey update & decoding successful. New survey data: ');
      end(decoded);
      return decoded;
    } catch (err) {
      log('Survey update or decoding unsuccessful.');

      return null;
    }
  };

  // Delete a survey
  static deleteSurvey = async (surveyId: string) => {
    try {
      const result = await ServerFacade.deleteSurvey(surveyId);
      if (result) {
        console.log('Survey deletion successful');
      }

      return result;
    } catch (err) {
      console.log('Survey deletion unsuccessful');
      console.error(err);
      return false;
    }
  };

  /* ------------------ Submission operations ------------------ */

  // Get all submissions from a particular survey
  static getSubmissions = async (surveyId: string) => {
    try {
      const submissions = await ServerFacade.getSubmissions(surveyId);
      if (!submissions) {
        return null;
      }

      const decoded = submissions.map((sub) => Submission.fromStorable(sub));
      return decoded;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Post a survey submission
  // The given submission data must be in the form of a Submission object
  static postSubmission = async (submission: Submission) => {
    try {
      const result = await ServerFacade.postSubmission(submission.toStorable());

      if (result) {
        console.log('Survey submission successful');
      }
      return result;
    } catch (err) {
      console.log('Survey submission unsuccessful');
      console.error(err);
      return false;
    }
  };

  // FIX: Requires LocalStorage implemented
  // Post all currently-stored survey submissions
  static postStoredSubmissions = async () => {
    // Get all submissions
    const submissions = await LocalDb.retrieveSubmissions();
    if (submissions.length === 0) {
      return true;
    }

    // Encode the submissions
    const encoded = submissions.map((sub) => sub.toStorable());

    // Submit them
    try {
      await ServerFacade.postSubmissions(encoded);

      // If successful, delete the submissions from local storage
      await LocalDb.deleteAllSubmissions();
      console.log('Posting of stored submissions successful');
      return true;
    } catch (err) {
      console.log('Posting of stored submissions unsuccessful');
      console.error(err);
      return false;
    }
  };

  /* ----------- User authentication and data fetching ----------- */
  // Registers a new user
  // Accepts a User object
  // Returns array of error messages, which is empty if the registration is successful
  static registerUser = async (user: StorableUser, password: string) => {
    const storable = await ServerFacade.registerUser({ ...user, password });
    return storable ? true : false;
  };

  // Log in a user
  // Returns array of error messages, which is empty if the registration is successful
  static login = async (email: string, password: string) => {
    const [log, end, err] = createLogger('ServerAdapter.login()');

    log('Attempting login...');
    const storable = await ServerFacade.login(email, password);
    if (!storable) {
      err('Login unsuccessful.');
      return false;
    }

    end('Login successful. Loading data into local storage.');
    await this.fetchAndStoreSurveys();
    await this.fetchAndStoreJournals();
    await this.fetchAndStoreEntries();
    return true;
  };

  /**
   * Logs out a user and clears their data from local storage.
   * @returns {Promise<boolean>} Indicates whether the logout was successful or not.
   */
  static logout = async () => {
    return await ServerFacade.logout();
  };

  /* ----------------- Journal operations ----------------- */
  // Fetch all available journals from the server
  static fetchAllJournals = async () => {
    try {
      console.log('Attempting to batch fetch journals...');
      const storableJournals = await ServerFacade.getAllJournals();
      if (!storableJournals) {
        console.log('Batch fetch failed.');
        return null;
      }

      console.log('Batch fetch succeeded. Attempting to decode...');
      const decoded = storableJournals.map((journalData) =>
        Journal.fromStorable(journalData)
      );
      console.log('Finished decoding.');
      return decoded;
    } catch (error) {
      console.log('ServerAdapter.fetchAllJournals(): Something went wrong.');
      return null;
    }
  };

  /**
   * Requires a user to be logged in. Fetches all available journals and stores them into local storage.
   */
  static fetchAndStoreJournals = async (): Promise<void> => {
    const [log, end, err] = createLogger(
      'ServeyAdapter.fetchAndStoreJournals()'
    );

    const journals = await this.fetchAllJournals();
    if (!journals) {
      return;
    }

    await LocalDb.deleteAllJournals();
    await LocalDb.bulkPutJournals(journals);
  };

  // Fetch the latest version of a particular journal
  static fetchJournal = async (journalId: string) => {
    const journalData = await ServerFacade.getJournal(journalId);
    if (!journalData) {
      return null;
    }
    const journal = Journal.fromStorable(journalData);

    return journal;
  };

  // Create a new journal and get its data
  static createJournal = async (newJournal: Journal) => {
    const journalData = await ServerFacade.createJournal(
      newJournal.toStorable()
    );
    if (!journalData) {
      return null;
    }
    const journal = Journal.fromStorable(journalData);

    return journal;
  };

  /**
   * Update the journal template.
   * @param template The new journal template.
   * @returns {Promise<JournalTemplate>} The updated journal template.
   */
  static updateJournalTemplate = async (template: JournalTemplate) => {
    const updatedTemplate = await ServerFacade.updateJournalTemplate(
      template.toStorable()
    );
    if (!updatedTemplate) {
      return null;
    }

    return JournalTemplate.fromStorable(updatedTemplate);
  };

  /**
   * Get the journal template.
   * @returns {Promise<JournalTemplate>} The journal template.
   */
  static fetchJournalTemplate = async () => {
    const template = await ServerFacade.getJournalTemplate();
    if (!template) {
      return null;
    }

    return JournalTemplate.fromStorable(template);
  };

  // Delete a journal
  static deleteJournal = async (journalId: string) => {
    return await ServerFacade.deleteJournal(journalId);
  };

  // Todo: Verify all below
  /* ----------------- Entry operations ----------------- */
  // Get all journal entries associated with a journal
  static fetchEntriesForJournal = async (journalId: string) => {
    const entryData = await ServerFacade.getEntriesForJournal(journalId);
    if (!entryData) {
      return null;
    }

    return entryData.map((elem) => Entry.fromStorable(elem));
  };

  static fetchAllEntries = async () => {
    const entryData = await ServerFacade.getAllEntries();
    if (!entryData) {
      return null;
    }

    return entryData.map((elem) => Entry.fromStorable(elem));
  };

  /**
   * Requires a user to be logged in. Fetches all available journals and stores them into local storage.
   */
  static fetchAndStoreEntries = async (): Promise<void> => {
    const [log, end, err] = createLogger(
      'ServeyAdapter.fetchAndStoreEntries()'
    );

    const entries = await this.fetchAllEntries();
    if (!entries) {
      return;
    }

    await LocalDb.deleteAllEntries();
    await LocalDb.bulkPutEntries(entries);
  };

  // Post a new journal entry
  static postEntry = async (entry: Entry) => {
    const entryData = await ServerFacade.postEntry(entry.toStorable());
    if (!entryData) {
      return null;
    }

    return Entry.fromStorable(entryData);
  };

  // Post multiple new journal entries
  // entries must be an array of JournalEntries
  static postEntries = async (entries: Entry[]) => {
    const entryData = await ServerFacade.postEntries(
      entries.map((entry) => entry.toStorable())
    );
    if (!entryData) {
      return null;
    }

    return entryData.map((entry) => Entry.fromStorable(entry));
  };

  static postStoredEntries = async () => {
    const entries = await LocalDb.retrieveEntries();
    if (entries.length === 0) {
      return true;
    }

    const storables = entries.map((entry) => entry.toStorable());

    // Submit them
    try {
      await ServerFacade.postEntries(storables);
      console.log('Posting of stored entries successful');
      return true;
    } catch (err) {
      console.log('Posting of stored entries unsuccessful');
      console.error(err);
      return false;
    }
  };

  // Update an existing entry
  static updateJournalEntry = async (entry: Entry) => {
    const entryData = await ServerFacade.putEntry(entry.toStorable());
    if (!entryData) {
      return null;
    }

    return Entry.fromStorable(entryData);
  };
}
