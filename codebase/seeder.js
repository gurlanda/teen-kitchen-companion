const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to database
mongoose.connect(process.env.MONGO_URI);

// Get the database schema
const Survey = require('./models/Survey');
const Submission = require('./models/Submission');

// Read Surveys from file
let surveys = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/SampleSurvey.json`, 'utf-8')
);

// Convert String IDs into ObjectIds
// surveys = surveys.map((survey) => {
//   survey._id = new mongoose.Types.ObjectId(survey._id);
//   return survey;
// });

// Read Submissions from file
const submissions = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/SampleSubmission.json`, 'utf-8')
);

// Import Surveys from file into DB
const importSurveys = async () => {
  try {
    await Survey.create(surveys);

    console.log('Surveys Imported'.inverse.green);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Import Submissions from file into DB
const importSubmissions = async () => {
  try {
    await Submission.create(submissions);

    console.log('Submissions Imported'.inverse.green);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

// Delete all Surveys
const deleteAllSurveys = async () => {
  try {
    await Survey.deleteMany();

    console.log('Surveys Deleted'.inverse.red);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

// Delete all Submissions
const deleteAllSubmissions = async () => {
  try {
    await Submission.deleteMany();

    console.log('Submissions Deleted'.inverse.red);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

// Check the command line arguments
if (process.argv.length !== 4) {
  console.log('Command not recognized.'.red);
  process.exit();
}

if (process.argv[2] === '-i') {
  if (process.argv[3] === 'surveys') {
    importSurveys();
  } else if (process.argv[3] === 'submissions') {
    importSubmissions();
  } else {
    console.log(
      "Command not recognized. Did you mean 'surveys' or 'submissions'?".red
    );
    process.exit();
  }
} else if (process.argv[2] === '-d') {
  if (process.argv[3] === 'surveys') {
    deleteAllSurveys();
  } else if (process.argv[3] === 'submissions') {
    deleteAllSubmissions();
  } else {
    console.log(
      "Command not recognized. Did you mean 'surveys' or 'submissions'?".red
    );
    process.exit();
  }
} else {
  console.log('Command not recognized.'.red);
  process.exit();
}
