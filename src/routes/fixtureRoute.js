import { Router } from 'express';
import FixtureController from '../controllers/fixtureController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/fixtureValidation';

const { addFixture } = FixtureController;
const { verifyToken, verifyAdmin } = Authentication;
const router = Router();

router.post('/', verifyToken, verifyAdmin, validate.fixture, addFixture);

export default router;
