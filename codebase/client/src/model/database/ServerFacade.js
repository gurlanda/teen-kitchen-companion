import axios from 'axios';

// Make sure that cookies are sent (needed for authentication)
const api = axios.create({
  withCredentials: true,
});

// The server URL depends on the environment
const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.origin.toString()}/api/v1`
    : 'http://localhost:4672/api/v1';

export class ServerFacade {
  /* ----------------- Submission operations ----------------- */
  // Get all submissions for a particular survey
  static getSubmissions = async (surveyId) => {
    try {
      // This must submit admin authentication
      const res = await api.get(
        SERVER_URL + `/surveys/id/${surveyId}/submissions`
      );

      return res.data.data;
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
      return null;
    }
  };

  // Post a survey submission
  static postSubmission = async (submission, surveyId) => {
    try {
      console.log('ServerFacade: Posting submission...');
      await api.post(SERVER_URL + `/surveys/submit?id=${surveyId}`, submission);
    } catch (err) {
      console.log('ServerFacade: Submission failed. Submission:');
      console.log(submission);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
    }

    console.log('ServerFacade: Submission successful');
  };

  // Post multiple survey submissions
  static postSubmissions = async (submissions) => {
    try {
      await api.post(SERVER_URL + '/surveys/submit', submissions);
    } catch (err) {
      console.log('ServerFacade: Batch submission failed. Submissions:');
      console.log(submissions);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
    }

    console.log('ServerFacade: Batch submission successful');
  };

  /* ----------------- Survey operations ----------------- */
  // Fetch all available surveys from the server
  static getAllSurveys = async () => {
    try {
      console.log('ServerFacade: Attempting to batch fetch surveys...');
      const response = await api.get(SERVER_URL + '/surveys');

      // response.data just contains the body of the response
      // response.data.data contains the main payload, which is the surveys array in this case
      console.log('ServerFacade: Batch fetch surveys successful. Surveys:');
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log('ServerFacade: Batch fetch surveys failed');
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
      return null;
    }
  };

  // Fetch the latest version of a particular survey
  static getSurvey = async (surveyId) => {
    try {
      console.log('ServerFacade: Attempting to fetch a survey...');
      const res = await api.get(SERVER_URL + `/surveys?id=${surveyId}`);
      console.log('ServerFacade: Survey fetch successful. Survey:');
      console.log(res.data.data);
      return res.data.data;
    } catch (err) {
      console.log('ServerFacade: Survey fetch failed. SurveyId:');
      console.log(surveyId);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
      return null;
    }
  };

  // Create a survey. An admin needs to be logged in for this function to work.
  static createSurvey = async () => {
    try {
      const response = await api.post(SERVER_URL + '/surveys');

      // response.data just contains the body of the response
      // response.data.data contains the main payload, the blank survey data
      console.log('ServerFacade: Survey creation successful. New survey:');
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log('ServerFacade: Survey creation failed');
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
    }
  };

  // Update an existing survey. An admin needs to be logged in for this function to work.
  static updateSurvey = async (surveyData, surveyId) => {
    try {
      const response = await api.put(
        `${SERVER_URL}/surveys?id=${surveyId}`,
        surveyData
      );

      // response.data just contains the body of the response
      // response.data.data contains the main payload, the updated survey data
      console.log(
        'ServerFacade: Survey update successful. Updated survey data:'
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log('ServerFacade: Survey update failed. Submitted update data:');
      console.log(surveyData);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
    }
  };

  // Delete a survey. An admin needs to be logged in for this function to work.
  static deleteSurvey = async (surveyId) => {
    try {
      await api.delete(`${SERVER_URL}/surveys?id=${surveyId}`);
    } catch (err) {
      console.log('ServerFacade: Survey deletion failed. SurveyId:');
      console.log(surveyId);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
    }
    console.log(`ServerFacade: Survey deletion successful with id ${surveyId}`);
  };

  /* ----------------- User auth & other user operations ----------------- */
  // Registers a new user
  // Returns array of error messages, which is empty if the registration is successful
  static registerUser = async (name, email, userType, password) => {
    try {
      await api.post(`${SERVER_URL}/user`, {
        name,
        email,
        password,
        type: userType,
      });
      console.log('ServerFacade: New user registration successful.');
      return [];
    } catch (err) {
      console.log('ServerFacade: New user registration failed.');
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
          return err.response.data.errors.map((err) => err.msg);
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
      return errors;
    }
  };

  // Log in a user
  // Returns array of error messages, which is empty if the registration is successful
  static login = async (email, password) => {
    try {
      const res = await api.post(`${SERVER_URL}/user/auth`, {
        email,
        password,
      });
      console.log('ServerFacade: User login successful.');
      return [];
    } catch (err) {
      console.log('ServerFacade: User login failed');
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
          return err.response.data.errors.map((err) => err.msg);
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
      return errors;
    }
  };

  // Returns a logged-in user's data
  // If not logged in, or there was another error, returns null
  static getUserInfo = async () => {
    try {
      const res = await api.get(`${SERVER_URL}/user`);
      const success = res.data.success;
      if (success) {
        console.log('ServerFacade: User data retrieval successful.');
        return res.data.data;
      } else {
        return null;
      }
    } catch (err) {
      console.log('ServerFacade: User data retrieval failed.');
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
      return null;
    }
  };

  // Logs out a user
  // Returns true if successful, false if not
  static logout = async () => {
    try {
      const res = await api.post(`${SERVER_URL}/user/auth/logout`);
      console.log('ServerFacade: Logout successful');
      return res.data.success;
    } catch (err) {
      console.log('ServerFacade: Logout failed');
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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

  /* ----------------- Journal operations ----------------- */
  // Fetch all available journals from the server
  static getAllJournals = async () => {
    try {
      console.log('ServerFacade: Attempting to batch fetch journals...');
      const response = await api.get(SERVER_URL + '/journals');

      // response.data just contains the body of the response
      // response.data.data contains the main payload, which is the journals array in this case
      console.log(
        `ServerFacade: Batch fetch journal successful, retrieved ${response.data.count} journals. Journals:`
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log('ServerFacade: Batch fetch journal failed');
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
      return null;
    }
  };

  // Fetch the latest version of a particular journal
  static getJournal = async (journalId) => {
    try {
      console.log('ServerFacade: Attempting to fetch a journal...');
      const res = await api.get(
        SERVER_URL + `/journals?journalid=${journalId}`
      );
      console.log('ServerFacade: journal fetch successful. Journal:');
      console.log(res.data.data);
      return res.data.data;
    } catch (err) {
      console.log('ServerFacade: journal fetch failed. journalId:');
      console.log(journalId);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
      return null;
    }
  };

  // Create a journal. An admin needs to be logged in for this function to work.
  static createJournal = async (weekStartDate, weekEndDate) => {
    try {
      const response = await api.post(SERVER_URL + '/journals', {
        weekStartDate,
        weekEndDate,
      });

      // response.data just contains the body of the response
      // response.data.data contains the main payload, the blank journal data
      console.log('ServerFacade: Journal creation successful. New journal:');
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log('ServerFacade: Journal creation failed');
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
    }
  };

  // Update the journal template. An admin needs to be logged in for this function to work.
  static updateJournalTemplate = async (updatedTemplateQuestions) => {
    try {
      const response = await api.put(
        `${SERVER_URL}/journals/template`,
        updatedTemplateQuestions
      );

      // response.data just contains the body of the response
      // response.data.data contains the main payload, the updated journal template data
      console.log(
        'ServerFacade: Journal update successful. Updated journal template data:'
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log(
        'ServerFacade: Journal update failed. Submitted update data:'
      );
      console.log(updatedTemplateQuestions);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
    }
  };

  // Delete a journal. An admin needs to be logged in for this function to work.
  static deleteJournal = async (journalId) => {
    try {
      await api.delete(`${SERVER_URL}/journals?id=${journalId}`);
    } catch (err) {
      console.log('ServerFacade: Journal deletion failed. JournalId:');
      console.log(journalId);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
    }
    console.log(
      `ServerFacade: Journal deletion successful with id ${journalId}`
    );
  };

  // FIX
  // Get a logged-in user's entry for this journal
  static getJournalEntry = async (journalId) => {
    try {
      console.log('ServerFacade: Retrieving journal entry');
      const res = await api.get(
        SERVER_URL + `/journals/entries?id=${journalId}`
      );

      console.log('ServerFacade: Journal entry submission successful');
      return res.data.data;
    } catch (err) {
      console.log('ServerFacade: Journal entry submission failed. Journal ID:');
      console.log(journalId);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
    }
  };

  static getJournalEntries = async (journalId) => {};
  static postJournalEntry = async (entry, journalId) => {};
  static postJournalEntries = async (entry, journalId) => {};
  static putJournalEntries = async (entry, journalId) => {};

  // FIX
  // Update a journal entry
  static putJournalEntry = async (entry, journalId) => {
    try {
      console.log('ServerFacade: Posting journal entry...');
      await api.put(SERVER_URL + `/journals/entry?id=${journalId}`, entry);
    } catch (err) {
      console.log('ServerFacade: JournalEntry failed. JournalEntry:');
      console.log(entry);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
    }

    console.log('ServerFacade: JournalEntry successful');
  };
}
