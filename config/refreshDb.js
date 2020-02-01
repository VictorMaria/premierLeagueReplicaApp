/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Team from '../models/Team';
import client from '../helpers/redis';
 
dotenv.config();
const db = process.env.mongoURITest;
 
const wipeRedisDb = async () => {
    await client.flushall((error) => {
        if (error) throw new Error(error);
        console.log('Data cache has been cleared');
      });
}

const refreshDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected...');
    await User.deleteMany({});
    console.log('User collection deleted');
    await Team.deleteMany({});
    console.log('Team collection deleted');
    await wipeRedisDb();
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
 
export default refreshDb();
 
require('make-runnable');