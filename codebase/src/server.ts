import express, { Application } from 'express';
import connectDb from './config/db';
import { load } from 'ts-dotenv';
import journalRoutes from './routes/journals';
import userRoutes from './routes/user';
import surveyRoutes from './routes/surveys';
import cors from 'cors';

const env = load({
  MONGO_URI: String,
  PORT: Number,
  NODE_ENV: ['production' as const, 'development' as const],
});

connectDb();
const app: Application = express();

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use('/api/v1/surveys', surveyRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/journals', journalRoutes);

const PORT = env.PORT || 4672;
const server = app.listen(PORT, () =>
  console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error ${err.message}`.red);
//   server.close(() => process.exit(1));
// });
