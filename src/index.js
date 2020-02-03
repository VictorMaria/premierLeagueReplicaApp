import '@babel/polyfill';
import express from 'express';
import Debug from 'debug';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import connectDb from './config/db';
import routes from './routes/index';
import client from './helpers/redis';
import fixtureLinkRedirect from './helpers/fixtureLinkRedirect';
import Authentication from './middlewares/authentication';
 
dotenv.config()
const { SECRET } = process.env;

const ApiPrefix = '/api/v1';
const debug = Debug('dev');

let RedisStore = require('connect-redis')(session)
 
const app = express();
connectDb();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(ApiPrefix, routes);
app.use(
  session({
    store: new RedisStore({ client }),
    secret: SECRET,
    name: 'premierLeagueReplicaApp',
    resave: false,
    saveUninitialized: true,
  })
);

const { verifyToken } = Authentication;
 
app.get('/:id', verifyToken, (req, res) => {
  console.log(req.session)
  fixtureLinkRedirect(req, res);
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Premier League lives here' });
});
 
const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => debug(`Premier League lives on ${PORT}`));

export default app;