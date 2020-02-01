/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
 
dotenv.config();
const { NODE_ENV, mongoURITest, mongoURI } = process.env;
const selectMongoURI = () => {
    if (NODE_ENV === 'test') {
        const URIString = mongoURITest;
        return URIString;
    }
    const URIString = mongoURI
    return URIString
};
const db = selectMongoURI();
 
const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
 
export default connectDb;