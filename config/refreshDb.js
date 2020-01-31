/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Fixture from '../models/Fixture';
import User from '../models/User';
import Team from '../models/Team';
 
dotenv.config();
const db = process.env.mongoURITest;
 
const refreshDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected...');
    await Fixture.deleteMany({});
    console.log('Fixture collection deleted');
    await User.deleteMany({});
    console.log('User collection deleted');
    await Team.deleteMany({});
    console.log('Team collection deleted')
    process.exit(0)
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
 
export default refreshDb();
 
require('make-runnable');