const express = require('express');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const { config } = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const path = require('path'); 

const connectDb = require('./config/db.js');
const surveys = require('./routes/surveys');
const user = require('./routes/user');
const journals = require('./routes/journals');

// Load environment variables
config({ path: './config/config.env' });

// Connect to database
connectDb();

const app = express();

// Use MongoDB to store user sessions
const store = new MongoDbStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
});

// Catch store init errors
store.on('error', (err) => {
  console.log(err);
});

// The CORS policy depends on the environment
const corsPolicy =
  process.env.NODE_ENV === 'production'
    ? { credentials: true }
    : {
        credentials: true,
        origin: `http://localhost:${process.env.FRONTEND_PORT}`,
      };

app.use(cors(corsPolicy));

// Initialize store for user sessions
app.use(
  session({
    secret: process.env.JWT_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    },
    store: store,

    // Required settings to use connect-mongodb-session as a store
    resave: true,
    saveUninitialized: true,
  })
);

// Middleware for parsing request body
app.use(express.json());

// Middleware for development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/surveys', surveys);
app.use('/api/v1/user', user);
app.use('/api/v1/journals', journals);

// Serve static assets during production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4672;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`.red);
  server.close(() => process.exit(1));
});
