/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import express from 'express';
import Debug from 'debug';
import cors from 'cors';
import connectDb from './config/db';
import routes from './routes/index';
 
const ApiPrefix = '/api/v1';
const debug = Debug('dev');
 
const app = express();
connectDb();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(ApiPrefix, routes);
 
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Premier League lives here' });
});
 
const PORT = process.env.PORT || 5000;
 
if(!process.env.NODE_ENV === 'test') {
    app.listen(PORT, () => debug(`Premier League lives on ${PORT}`));
}

export default app;