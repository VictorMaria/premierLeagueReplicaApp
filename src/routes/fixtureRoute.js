import { Router } from 'express';
import FixtureController from '../controllers/fixtureController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/fixtureValidation';

const { addFixture, editFixture } = FixtureController;
const { verifyToken, verifyAdmin } = Authentication;
const router = Router();

router.post('/', verifyToken, verifyAdmin, validate.fixture, addFixture);
router.patch('/:id', verifyToken, verifyAdmin, validate.validateId, validate.fixture, editFixture);

export default router;
