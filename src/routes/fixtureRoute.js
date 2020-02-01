import { Router } from 'express';
import FixtureController from '../controllers/fixtureController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/fixtureValidation';
import Cache from '../helpers/cache';
import rateLimiter from '../middlewares/rateLimiter';

const { addFixture,
        getFixture,
        getFixtureForAdmin,
        editFixture,
        getCompletedFixtures,
    } = FixtureController;
const { verifyToken, verifyAdmin } = Authentication;
const { getCachedCompletedFixtures } = Cache;
const router = Router();

router.post('/', verifyToken, verifyAdmin, validate.fixture, addFixture);
router.get('/completed', verifyToken, rateLimiter, getCachedCompletedFixtures, getCompletedFixtures)
router.get('/:id', verifyToken, validate.validateId, getFixture);
router.get('/:id/admin', verifyToken, verifyAdmin, validate.validateId, getFixtureForAdmin);
router.patch('/:id', verifyToken, verifyAdmin, validate.validateId, validate.fixture, editFixture);

export default router;
