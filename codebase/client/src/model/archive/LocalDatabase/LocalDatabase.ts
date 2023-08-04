import Dexie from 'dexie';
import ServerAdapter from '../Server/ServerAdapter';
import Submission from '../Survey/Submission';

import StorableSurvey from '../Storables/StorableSurvey';
import StorableSubmission from '../Storables/StorableSubmission';
import StorableJournal from '../Storables/StorableJournal';
import StorableEntry from '../Storables/StorableEntry';
import StorableQuestion from '../Storables/StorableQuestion';
import Survey from '../Survey/Survey';
import Journal from '../Journal/Journal';
import Entry from '../Journal/Entry';
import StorableUser from '../../User/StorableUser';
import UserType from '../../User/UserType';
import User from '../../User/User';
import createLogger from 'src/utils/createLogger';

interface IndexableSurvey extends StorableSurvey {
  id: string;
  _id: string;
  title: string;
  version: number;
  description: string;
  audience: UserType.asUnion[];
  deactivatedAt?: number;
  updatedAt?: number;
  questions: StorableQuestion[];
}

interface IndexableSubmission extends StorableSubmission {
  id: string;
  surveyId: string;
  userEmail: string;
}

interface IndexableJournal extends StorableJournal {
  id: string;
  weekStart: number;
  weekEnd: number;
}

interface IndexableEntry extends StorableEntry {
  id: string;
  journalId: string;
  userEmail: string;
}

interface IndexableUser extends StorableUser {
  id: string;
  email: string;
  name: string;
  type: UserType.asUnion;
  accessToken?: string;
  refreshToken?: string;
}

// const db = new Dexie('TeenKitchenCompanion');
class LocalDatabase extends Dexie {
  surveys!: Dexie.Table<IndexableSurvey, string>;
  submissions!: Dexie.Table<IndexableSubmission, string>;
  journals!: Dexie.Table<IndexableJournal, string>;
  entries!: Dexie.Table<IndexableEntry, string>;
  user!: Dexie.Table<IndexableUser, string>;

  constructor() {
    super('LocalDatabase');
    this.version(1).stores({
      surveys: 'id, audience',
      submissions: 'id, surveyId, userEmail',
      journals: 'id, weekStart, weekEnd',
      entries: 'id, userEmail, journalId',
      user: 'id, email, name, type',
    });
  }
}

namespace LocalDb {
  const db = new LocalDatabase();

  // Attempt to fill the database on creation
  // We don't use on('populate') because we will be
  //  performing asynchronous operations,
  //  which would cause problems within on('populate')
  //  (See Dexie documentation for more info)
  // db.on('ready', () => {
  //   const [log, end, err] = createLogger('LocalDatabase > on("ready")');
  //   log('Initializing Dexie.');
  //   // We want to return a Promise so that the initialization of local storage happens before we use it
  //   return Promise.all([
  //     ServerAdapter.fetchAllSurveys()
  //       .then((fetchedSurveys) => {
  //         if (fetchedSurveys === null) {
  //           err('Error fetching or storing surveys.');
  //           return;
  //         }

  //         end('Fetch successful.');
  //         return bulkPutSurveys(fetchedSurveys);
  //       })
  //       .catch((err) => {
  //         err('Error fetching or storing surveys.');
  //         console.error(err);
  //         return;
  //       }),
  //     ServerAdapter.fetchAllJournals()
  //       .then((fetchedJournals) => {
  //         if (fetchedJournals === null) {
  //           err('Error fetching or storing journals.');
  //           return;
  //         }

  //         end('Fetch successful.');
  //         return bulkPutJournals(fetchedJournals);
  //       })
  //       .catch((err) => {
  //         err('Error fetching or storing journals.');
  //         console.error(err);
  //         return;
  //       }),
  //     ServerAdapter.fetchAllEntries()
  //       .then((fetchedEntries) => {
  //         if (!fetchedEntries) {
  //           err('Error fetching or storing entries.');
  //           return;
  //         }

  //         end('Fetch successful.');
  //         return bulkPutEntries(fetchedEntries);
  //       })
  //       .catch((err) => {
  //         err('Error fetching or storing entries.');
  //         console.error(err);
  //         return;
  //       }),
  //   ]);
  // });

  const toStorableSurvey = (indexable: IndexableSurvey): StorableSurvey => {
    const { id, ...theRest } = indexable;
    return { ...theRest };
  };

  const toIndexableSurvey = (storable: StorableSurvey): IndexableSurvey => {
    return { id: storable._id, ...storable };
  };

  const toStorableSubmission = (
    indexable: IndexableSubmission
  ): StorableSubmission => {
    const { id, ...theRest } = indexable;
    return { ...theRest };
  };

  const toIndexableSubmission = (
    storable: StorableSubmission
  ): IndexableSubmission => {
    return { id: storable._id, ...storable };
  };

  const toStorableJournal = (indexable: IndexableJournal): StorableJournal => {
    const { id, ...theRest } = indexable;
    return { ...theRest };
  };

  const toIndexableJournal = (storable: StorableJournal): IndexableJournal => {
    return { id: storable._id, ...storable };
  };

  const toStorableEntry = (indexable: IndexableEntry): StorableEntry => {
    const { id, ...theRest } = indexable;
    return { ...theRest };
  };

  const toIndexableEntry = (storable: StorableEntry): IndexableEntry => {
    return { id: storable._id, ...storable };
  };

  const toStorableUser = (indexable: IndexableUser): StorableUser => {
    return {
      email: indexable.email,
      type: indexable.type,
      name: indexable.name,
    };
  };

  const toIndexableUser = (
    storable: StorableUser,
    accessToken?: string,
    refreshToken?: string
  ): IndexableUser => {
    return {
      id: storable.email,
      email: storable.email,
      name: storable.name,
      type: storable.type,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };

  /* ------------------ Submission operations ------------------ */
  export const retrieveSubmissions = async () => {
    const allSubs = await db.submissions.toArray();

    // Store raw data into Submission objects
    const submissions = allSubs
      .map((elem) => toStorableSubmission(elem))
      .map((elem) => Submission.fromStorable(elem));

    return submissions;
  };

  export const retrieveSubmissionsOfSurvey = async (surveyId: string) => {
    const subs = await db.submissions
      .where('surveyId')
      .equals(surveyId)
      .toArray();

    // Store raw data into Submission objects
    const submissions = subs
      .map((elem) => toStorableSubmission(elem))
      .map((elem) => Submission.fromStorable(elem));

    return submissions;
  };

  export const retrieveSubmissionsOfUser = async (userEmail: string) => {
    const subs = await db.submissions
      .where('userEmail')
      .equals(userEmail)
      .toArray();

    // Store raw data into Submission objects
    const submissions = subs
      .map((elem) => toStorableSubmission(elem))
      .map((elem) => Submission.fromStorable(elem));

    return submissions;
  };

  export const storeSubmission = async (submission: Submission) => {
    const indexable = toIndexableSubmission(submission.toStorable());
    return await db.submissions.add(indexable);
  };

  export const updateSubmission = async (submission: Submission) => {
    const indexable = toIndexableSubmission(submission.toStorable());
    return await db.submissions.put(indexable);
  };

  export const bulkPutSubmissions = async (submissions: Submission[]) => {
    const indexables = submissions.map((elem) =>
      toIndexableSubmission(elem.toStorable())
    );
    return await db.submissions.bulkPut(indexables);
  };

  export const deleteSubmission = async (submissionId: string) => {
    return await db.submissions.delete(submissionId);
  };

  export const deleteAllSubmissions = async () => {
    return await db.submissions.clear();
  };

  /* ------------------ Survey operations ------------------ */

  // If online, deletes the stored Surveys and replaces them with the fresh surveys
  // If offline, no changes are made
  export const refreshSurveys = async () => {
    const activeSurveys = await ServerAdapter.fetchAllSurveys();

    // Do nothing if offline or there's an error
    if (activeSurveys === null) {
      return false;
    }

    await deleteAllSurveys();
    const result = await bulkPutSurveys(activeSurveys);
    if (result) {
      return true;
    } else {
      return false;
    }
  };

  export const retrieveSurveys = async () => {
    const allSubs = await db.surveys.toArray();

    // Store raw data into Survey objects
    const surveys = allSubs
      .map((elem) => toStorableSurvey(elem))
      .map((elem) => Survey.fromStorable(elem));

    return surveys;
  };

  export const retrieveSurvey = async (surveyId?: string) => {
    if (!surveyId) {
      return null;
    }

    const survey = await db.surveys.get({ id: surveyId });
    if (!survey) {
      return null;
    }

    return Survey.fromStorable(toStorableSurvey(survey));
  };

  export const storeSurvey = async (survey: Survey) => {
    const indexable = toIndexableSurvey(survey.toStorable());
    try {
      return await db.surveys.add(indexable);
    } catch (e: any) {
      console.error(e);
      return null;
    }
  };

  export const updateSurvey = async (survey: Survey) => {
    const indexable = toIndexableSurvey(survey.toStorable());
    return await db.surveys.put(indexable);
  };

  export const bulkPutSurveys = async (surveys: Survey[]) => {
    const indexables = surveys.map((elem) =>
      toIndexableSurvey(elem.toStorable())
    );
    return await db.surveys.bulkPut(indexables);
  };

  // Delete all currently-stored surveys
  export const deleteAllSurveys = async () => {
    await db.surveys.clear();
  };

  /* ------------------ Journal operations ------------------ */

  // If online, deletes the stored Surveys and replaces them with the fresh surveys
  // If offline, no changes are made
  export const refreshJournals = async () => {
    const activeJournals = await ServerAdapter.fetchAllJournals();

    // Do nothing if offline or there's an error
    if (activeJournals === null) {
      return false;
    }

    await deleteAllJournals();
    const result = await bulkPutJournals(activeJournals);
    if (result) {
      return true;
    } else {
      return false;
    }
  };

  export const retrieveJournals = async () => {
    const allJournals = await db.journals.toArray();

    // Store raw data into Journal objects
    const journals = allJournals
      .map((elem) => toStorableJournal(elem))
      .map((elem) => Journal.fromStorable(elem));

    return journals;
  };

  export const retrieveJournal = async (journalId: string) => {
    const journal = await db.journals.get({ id: journalId });
    if (!journal) {
      return null;
    }

    return Journal.fromStorable(toStorableJournal(journal));
  };

  export const storeJournal = async (journal: Journal) => {
    const indexable = toIndexableJournal(journal.toStorable());
    try {
      return await db.journals.add(indexable);
    } catch (e: any) {
      console.error(e);
      return null;
    }
  };

  export const updateJournal = async (journal: Journal) => {
    const indexable = toIndexableJournal(journal.toStorable());
    return await db.journals.put(indexable);
  };

  export const bulkPutJournals = async (journals: Journal[]) => {
    const indexables = journals.map((elem) =>
      toIndexableJournal(elem.toStorable())
    );

    return await db.journals.bulkPut(indexables);
  };

  // Delete all currently-stored journals
  export const deleteAllJournals = async () => {
    await db.journals.clear();
  };

  /* ------------------ Entry operations ------------------ */
  export const refreshEntries = async () => {
    const entries = await ServerAdapter.fetchAllEntries();

    // Do nothing if offline or there's an error
    if (entries === null) {
      return false;
    }

    await deleteAllEntries();
    const result = await bulkPutEntries(entries);
    if (result) {
      return true;
    } else {
      return false;
    }
  };

  export const retrieveEntry = async (entryId: string) => {
    const indexableEntry = await db.entries.get({ id: entryId });
    if (!indexableEntry) {
      return null;
    }

    return Entry.fromStorable(toStorableEntry(indexableEntry));
  };

  export const retrieveEntries = async () => {
    const allEntries = await db.entries.toArray();

    // Store raw data into Entry objects
    const entries = allEntries
      .map((elem) => toStorableEntry(elem))
      .map((elem) => Entry.fromStorable(elem));

    return entries;
  };

  export const retrieveEntriesOfJournal = async (journalId: string) => {
    const entryData = await db.entries
      .where('journalId')
      .equals(journalId)
      .toArray();

    // Store raw data into Entry objects
    const entries = entryData
      .map((elem) => toStorableEntry(elem))
      .map((elem) => Entry.fromStorable(elem));

    return entries;
  };

  export const retrieveEntriesOfUser = async (userEmail: string) => {
    const subs = await db.entries
      .where('userEmail')
      .equals(userEmail)
      .toArray();

    // Store raw data into Entry objects
    const entries = subs
      .map((elem) => toStorableEntry(elem))
      .map((elem) => Entry.fromStorable(elem));

    return entries;
  };

  export const storeEntry = async (entry: Entry) => {
    const indexable = toIndexableEntry(entry.toStorable());
    try {
      const result = await db.entries.add(indexable);
      if (result) {
        return true;
      }
    } catch (e: any) {
      return false;
    }
  };

  export const updateEntry = async (entry: Entry) => {
    const indexable = toIndexableEntry(entry.toStorable());
    return await db.entries.put(indexable);
  };

  export const bulkPutEntries = async (entries: Entry[]) => {
    const indexables = entries.map((elem) =>
      toIndexableEntry(elem.toStorable())
    );
    return await db.entries.bulkPut(indexables);
  };

  export const deleteEntry = async (entryId: string) => {
    return await db.entries.delete(entryId);
  };

  export const deleteAllEntries = async () => {
    return await db.entries.clear();
  };

  /* ------------------ User operations ------------------ */
  // Invariants to keep in mind when modifying these functions:
  //  - There is to be at most one user stored in the db.user table

  const getUserData = async () => {
    const userData = await db.user.toArray();
    if (userData.length === 0) {
      return null;
    }

    return userData[0];
  };

  export const getAccessToken = async (): Promise<string | null> => {
    const user = await getUserData();
    if (!user) {
      return null;
    }

    return user.accessToken ?? null;
  };

  // Set the stored access token or replace it if it already exists
  export const setAccessToken = async (accessToken: string) => {
    const user = await getUserData();
    if (!user) {
      return false;
    }

    user.accessToken = accessToken;
    await setUser(user);
    return true;
  };

  export const getRefreshToken = async (): Promise<string | null> => {
    const user = await getUserData();
    if (!user) {
      return null;
    }

    return user.refreshToken ?? null;
  };

  export const setUser = async (
    storable: StorableUser,
    accessToken?: string,
    refreshToken?: string
  ) => {
    const [log, end] = createLogger('LocalDatabase.setUser()');
    log('Attempting to set user.');
    try {
      const userData = toIndexableUser(storable, accessToken, refreshToken);
      log(userData);
      await db.user.clear();
      await db.user.add(userData);
    } catch (e: any) {
      log('Error.');
      end(e);
    }
  };

  export const getUser = async (): Promise<User | null> => {
    const user = await getUserData();
    if (!user) {
      return null;
    }

    return User.fromStorable(toStorableUser(user));
  };

  export const clearUser = async () => {
    await db.user.clear();
  };

  export const isUserLoaded = async (): Promise<boolean> => {
    const user = await getUserData();
    return user ? true : false;
  };
}
export default LocalDb;
