import { Router } from 'express';
import FixtureController from '../controllers/fixtureController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/fixtureValidation';

const { addFixture, getFixture, getFixtureForAdmin, editFixture } = FixtureController;
const { verifyToken, verifyAdmin } = Authentication;
const router = Router();

router.post('/', verifyToken, verifyAdmin, validate.fixture, addFixture);
router.get('/:id', verifyToken, validate.validateId, getFixture);
router.get('/:id/admin', verifyToken, verifyAdmin, validate.validateId, getFixtureForAdmin);
router.patch('/:id', verifyToken, verifyAdmin, validate.validateId, validate.fixture, editFixture);

export default router;
