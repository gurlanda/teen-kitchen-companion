import mongoose from 'mongoose';
import { load } from 'ts-dotenv';

const env = load({
  MONGO_URI: String,
  NODE_ENV: String,
});

const connectDb = async () => {
  let uri: string;
  if (env.NODE_ENV === 'development') {
    uri = 'mongodb://localhost:27017/tkc-local';
  } else {
    uri = env.MONGO_URI;
  }
  const conn = await mongoose.connect(uri);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDb;
