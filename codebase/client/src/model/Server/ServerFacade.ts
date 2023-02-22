import axios from 'axios';
import LoginInfo from './LoginInfo';
import ResponseErrors, { isResponseErrors } from '../Storables/ResponseErrors';
import StorableEntry from '../Storables/StorableEntry';
import StorableJournal from '../Storables/StorableJournal';
import StorableJournalTemplate from '../Storables/StorableJournalTemplate';
import StorableSubmission from '../Storables/StorableSubmission';
import StorableSurvey from '../Storables/StorableSurvey';
import StorableUser from '../Storables/StorableUser';
import ResponseData from './ResponseData';
import Tokens from '../Storables/Tokens';
import LocalDb from '../LocalDatabase/LocalDatabase';
import createLogger from 'src/utils/createLogger';

// Make sure that cookies are sent (needed for authentication)
const api = axios.create({
  // withCredentials: true,
});

// The server URL depends on the environment
const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.origin.toString()}/api/v1`
    : 'http://localhost:4672/api/v1';

class ServerFacade {
  private static setAuthHeader = (accessToken: string | false) => {
    const [log, end] = createLogger('ServerFacade > setAuthHeader()');
    api.defaults.headers.common['Authorization'] = accessToken;
    return;
  };

  private static loadAuthHeader = async () => {
    const [log, end] = createLogger('ServerFacade > loadAuthHeader()');

    log('Attempting to retrieve new access token...');
    const accessToken = await LocalDb.getAccessToken();
    if (accessToken) {
      this.setAuthHeader(accessToken);
      end('Success, added to header.');
    } else {
      this.setAuthHeader(false);
      end('Failed, resetting header.');
    }
  };

  private static reauthenticate = async () => {
    const [log, end, err] = createLogger('ServerFacade > reauthenticate()');
    try {
      log('Retrieving token...');
      const refreshToken = await LocalDb.getRefreshToken();
      const res = await api.put<ResponseData<{ accessToken: string }>>(
        SERVER_URL + `/user/auth`,
        { refreshToken }
      );

      const accessToken = res?.data?.payload?.accessToken;
      if (!accessToken) {
        err('Re-auth failed.');
        return false;
      }

      const success = await LocalDb.setAccessToken(accessToken);
      if (success) {
        this.loadAuthHeader();
        return true;
      } else {
        err('Token storage failed.');
        return false;
      }
    } catch (e: any) {
      if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (e.response.status === 401) {
        }

        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
        console.log(e.response.errors);
      } else if (e.request) {
        // The request was made but no response was received
        // `e.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(e.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', e.message);
      }
      err('Some error occurred.');
      console.log(e.config);
      return false;
    }
  };

  private static authRouteObjectHandler = async (request: Function) => {
    const [log, end, err] = createLogger(
      'ServerFacade.authRouteObjectHandler()'
    );
    try {
      await this.loadAuthHeader();
      return await request();
    } catch (err: any) {
      if (err.response?.status === 401) {
        try {
          log('Auth unsuccessful, attempting reauthentication...');
          const success = await this.reauthenticate();
          if (success) {
            log('Auth successful, retrying request...');
            const result = await request();
            return result;
          } else {
            err('Auth unsuccessful.');
            return null;
          }
        } catch (e: any) {
          err('Auth failed.');
          return null;
        }
      } else if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        console.log(err.response.errors);
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
      }
      console.log(err.config);
      err('Request failed.');
      return null;
    }
  };

  private static authRouteBoolHandler = async (request: Function) => {
    try {
      await this.loadAuthHeader();
      return await request();
    } catch (err: any) {
      if (err.response?.status === 401) {
        try {
          await this.reauthenticate();
          return await request();
        } catch (e: any) {
          return false;
        }
      } else if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        console.log(err.response.errors);
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
      }
      console.log(err.config);
      return false;
    }
  };

  /* ----------------- Submission operations ----------------- */
  // Get all submissions for a particular survey
  static getSubmissions = async (surveyId: string) => {
    const request = async () => {
      // This must submit admin authentication
      const res = await api.get<ResponseData<StorableSubmission[]>>(
        SERVER_URL + `/surveys/id/${surveyId}/submissions`
      );

      const data = res.data;
      if (!data.success) {
        return null;
      }

      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Post a survey submission
  static postSubmission = async (submission: StorableSubmission) => {
    const request = async () => {
      console.log('Posting submission...');
      const res = await api.post<ResponseData<StorableSubmission[]>>(
        SERVER_URL + `/surveys/submissions`,
        [submission]
      );

      const data = res.data;
      if (!data.success) {
        return false;
      }

      console.log('Submission successful');
      return true;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Post multiple survey submissions
  static postSubmissions = async (submissions: StorableSubmission[]) => {
    const request = async () => {
      const res = await api.post<ResponseData<StorableSubmission[]>>(
        SERVER_URL + '/surveys/submissions',
        submissions
      );

      const data = res.data;
      if (data.success) {
        console.log('Batch submission successful');
        return true;
      } else {
        return false;
      }
    };

    const output = await this.authRouteBoolHandler(request);
    return output as ReturnType<typeof request>;
  };

  /* ----------------- Survey operations ----------------- */
  // Fetch all available surveys from the server
  static getAllSurveys = async () => {
    const request = async () => {
      const [log, end] = createLogger('ServerFacade.getAllSurveys()');

      log('Attempting to batch fetch surveys...');
      const res = await api.get<ResponseData<StorableSurvey[]>>(
        SERVER_URL + '/surveys'
      );

      const data = res.data;
      if (!data.success) {
        log('Error:');
        end(data);
        return null;
      }

      // response.data just contains the body of the response
      // response.data.data contains the main payload, which is the surveys array in this case
      end('Batch fetch surveys successful.');
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Fetch the latest version of a particular survey
  static getSurvey = async (surveyId: string) => {
    const request = async () => {
      const [log, end] = createLogger('ServerFacade.getSurvey()');
      log('Attempting to fetch a survey...');
      const res = await api.get<ResponseData<StorableSurvey>>(
        SERVER_URL + `/surveys?surveyid=${surveyId}`
      );

      const data = res.data;
      if (!data.success) {
        log('Error:');
        end(data);
        return null;
      }

      log('Survey fetch successful. Survey:');
      end(data);
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Create a survey. An admin needs to be logged in for this function to work.
  static createSurvey = async () => {
    const request = async () => {
      const [log, end] = createLogger('ServerFacade.createSurvey()');

      log('Attempting to create a new survey...');
      const res = await api.post<ResponseData<StorableSurvey>>(
        SERVER_URL + '/surveys'
      );
      const data = res.data;
      if (!data.success) {
        log('Error:');
        end(data);
        return null;
      }

      // response.data just contains the body of the response
      // response.data.data contains the main payload, the blank survey data
      log('Survey creation successful. New survey:');
      end(data);
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Update an existing survey. An admin needs to be logged in for this function to work.
  static updateSurvey = async (
    surveyData: StorableSurvey,
    surveyId: string
  ) => {
    const request = async () => {
      const res = await api.put<ResponseData<StorableSurvey>>(
        `${SERVER_URL}/surveys?surveyid=${surveyId}`,
        surveyData
      );

      const data = res.data;
      if (!data.success) {
        return null;
      }

      // response.data just contains the body of the response
      // response.data.data contains the main payload, the updated survey data
      console.log('Survey update successful. Updated survey data:');
      console.log(data);
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Delete a survey. An admin needs to be logged in for this function to work.
  static deleteSurvey = async (surveyId: string) => {
    const request = async () => {
      const res = await api.delete<ResponseErrors | {}>(
        `${SERVER_URL}/surveys?surveyid=${surveyId}`
      );

      if (isResponseErrors(res.data)) {
        return false;
      }

      if (res.status === 204) {
        console.log(`Survey deletion successful with id ${surveyId}`);
      }
      return true;
    };

    const output = await this.authRouteBoolHandler(request);
    return output as ReturnType<typeof request>;
  };

  /* ----------------- User auth & other user operations ----------------- */
  // Registers a new user
  static registerUser = async (user: StorableUser & { password: string }) => {
    const request = async () => {
      const res = await api.post<ResponseData<StorableUser>>(
        `${SERVER_URL}/user`,
        user
      );

      const data = res.data;
      if (!data.success) {
        return null;
      }

      console.log('New user registration successful.');
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  /**
   * Logs in the user, stores their data in local storage, then returns it.
   * @param userEmail The user's email.
   * @param password The user's password.
   * @returns {Promise<StorableUser | null>} The user's data if login was successful, null if not.
   */
  static login = async (userEmail: string, password: string) => {
    const [log, end, err] = createLogger('ServerFacade.login()');
    try {
      const loginInfo: LoginInfo = { userEmail, password };
      const res = await api.post<ResponseData<Tokens & StorableUser>>(
        `${SERVER_URL}/user/auth`,
        loginInfo
      );

      const data = res.data;
      if (!data.success) {
        return null;
      }

      log('User login successful.');
      log(data);
      const payload = data.payload!;
      const user: StorableUser = {
        name: payload.name,
        email: payload.email,
        type: payload.type,
      };
      await LocalDb.setUser(user, payload.accessToken, payload.refreshToken);
      await this.setAuthHeader(payload.accessToken);
      return user;
    } catch (err: any) {
      err('User login failed');
      let errors = [];

      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        // If there are multiple validation errors, it would be stored in
        // the errors property
        // Otherwise, single errors would be stored in the error property
        if (err.response.errors) {
          // Extract just the error texts
          err.response.data.errors.map((err: any) => err.msg);
          return null;
        } else {
          errors.push(err.response.data.error);
        }
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
        errors.push(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
        errors.push(err.message);
      }
      console.log(err.config);
      return null;
    }
  };

  /**
   * Logs out a user and clears their data from local storage.
   * @returns {Promise<boolean>} Indicates whether the logout was successful or not.
   */
  static logout = async () => {
    const request = async () => {
      const [log, end] = createLogger('ServerFacade.logout()');
      const res = await api.post(`${SERVER_URL}/user/auth/logout`);
      log('Logout successful');
      await LocalDb.clearUser();
      return true;
    };

    const output = await this.authRouteBoolHandler(request);
    return output as ReturnType<typeof request>;
  };

  /* ----------------- Journal operations ----------------- */
  // Fetch all available journals from the server
  static getAllJournals = async () => {
    const request = async () => {
      const [log, end] = createLogger('ServerFacade.getAllJournals()');

      log('Attempting to batch fetch journals...');
      const res = await api.get<ResponseData<StorableJournal[]>>(
        SERVER_URL + '/journals'
      );

      const data = res.data;
      if (!data.success) {
        log('Unsuccessful.');
        end(data);
        return null;
      }

      log(
        `Batch fetch journal successful, retrieved ${
          data.payload!.length
        } journals. Journals:`
      );
      end(data);
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Fetch the latest version of a particular journal
  static getJournal = async (journalId: string) => {
    const request = async () => {
      console.log('Attempting to fetch a journal...');
      const res = await api.get<ResponseData<StorableJournal>>(
        SERVER_URL + `/journals?journalid=${journalId}`
      );
      const data = res.data;
      if (!data.success) {
        return null;
      }

      console.log('journal fetch successful. Journal:');
      console.log(data);
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Create a journal. An admin needs to be logged in for this function to work.
  static createJournal = async (newJournal: StorableJournal) => {
    const request = async () => {
      const res = await api.post<ResponseData<StorableJournal>>(
        SERVER_URL + '/journals',
        newJournal
      );

      const data = res.data;
      if (!data.success) {
        return null;
      }

      // response.data just contains the body of the response
      // response.data.data contains the main payload, the blank journal data
      console.log('Journal creation successful. New journal:');
      console.log(data);
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Update the journal template. An admin needs to be logged in for this function to work.
  static updateJournalTemplate = async (
    updatedTemplate: StorableJournalTemplate
  ) => {
    const request = async () => {
      const [log, end, err] = createLogger(
        'ServerFacade.updateJournalTemplate()'
      );
      const res = await api.put<ResponseData<StorableJournalTemplate>>(
        `${SERVER_URL}/journals/template`,
        updatedTemplate
      );

      const data = res.data;
      if (!data.success) {
        return null;
      }

      log('Journal update successful. Updated journal template data:');
      end(data);
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  /**
   * Get the journal template. Requires admin login.
   * @returns {Promise<StorableJournalTemplate | null>}
   */
  static getJournalTemplate = async () => {
    const request = async () => {
      const [log, end, err] = createLogger('ServerFacade.getJournalTemplate()');
      const res = await api.get<ResponseData<StorableJournalTemplate>>(
        `${SERVER_URL}/journals/template`
      );

      const data = res.data;
      if (!data.success) {
        err('Error');
        return null;
      }

      log('Journal template retrieval successful.');
      end(data);
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Delete a journal. An admin needs to be logged in for this function to work.
  static deleteJournal = async (journalId: string) => {
    const request = async () => {
      const res = await api.delete(`${SERVER_URL}/journals?id=${journalId}`);
      if (res.status === 204) {
        console.log(`Journal deletion successful with id ${journalId}`);
        return true;
      } else {
        return false;
      }
    };

    const output = await this.authRouteBoolHandler(request);
    return output as ReturnType<typeof request>;
  };

  /* ----------------- Entry operations ----------------- */
  // Get a logged-in user's entries for this journal
  static getEntriesForJournal = async (journalId: string) => {
    const request = async () => {
      console.log('Retrieving journal entry');
      const res = await api.get<ResponseData<StorableEntry[]>>(
        SERVER_URL + `/journals/entries?journalid=${journalId}`
      );

      const data = res.data;
      if (!data.success) {
        return null;
      }

      console.log('Journal entry submission successful');
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Get a logged-in user's entries
  static getAllEntries = async () => {
    const request = async () => {
      const [log, end] = createLogger('ServerAdapter.getAllEntries()');
      log('Retrieving journal entry.');
      const res = await api.get<ResponseData<StorableEntry[]>>(
        SERVER_URL + `/journals/entries`
      );

      const data = res.data;
      if (!data.success) {
        log('Error:');
        end(data);
        return null;
      }

      end('Journal entry retrieval successful.');
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  static postEntry = async (entry: StorableEntry) => {
    const request = async () => {
      console.log('Retrieving journal entry');
      const res = await api.post<ResponseData<StorableEntry[]>>(
        SERVER_URL + `/journals/entries`,
        [entry]
      );

      const payload = res.data.payload as Array<StorableEntry>;
      if (!res.data.success || payload.length === 0) {
        return null;
      }

      console.log('Journal entry submission successful');
      return payload[0];
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  static postEntries = async (entries: StorableEntry[]) => {
    const request = async () => {
      console.log('Retrieving journal entry');
      const res = await api.post<ResponseData<StorableEntry[]>>(
        SERVER_URL + `/journals/entries`,
        entries
      );

      const data = res.data;
      if (!data.success) {
        return null;
      }

      console.log('Journal entry submission successful');
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };

  // Update a journal entry
  static putEntry = async (entry: StorableEntry) => {
    const request = async () => {
      console.log('Posting journal entry...');
      const res = await api.put<ResponseData<StorableEntry>>(
        SERVER_URL + `/journals/entries`,
        entry
      );

      const data = res.data;
      if (!data.success) {
        return null;
      }

      console.log('JournalEntry successful');
      return data.payload;
    };

    const output = await this.authRouteObjectHandler(request);
    return output as ReturnType<typeof request>;
  };
}
export default ServerFacade;
