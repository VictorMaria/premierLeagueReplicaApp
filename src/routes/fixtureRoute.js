import { Router } from 'express';
import FixtureController from '../controllers/fixtureController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/fixtureValidation';
import Cache from '../helpers/cache';
import rateLimiter from '../middlewares/rateLimiter';

const {
        addFixture,
        getFixture,
        getFixtureForAdmin,
        editFixture,
        getCompletedFixtures,
        getPendingFixtures,
        incrementHomeTeamScore,
        incrementAwayTeamScore,
        decrementHomeTeamScore,
        decrementAwayTeamScore,
      } = FixtureController;

const { verifyToken, verifyAdmin } = Authentication;
const { getCachedCompletedFixtures, getCachedPendingFixtures } = Cache;
const router = Router();

router.post('/', verifyToken, verifyAdmin, validate.fixture, addFixture);
router.get('/completed', verifyToken, rateLimiter, getCachedCompletedFixtures, getCompletedFixtures);
router.get('/pending', verifyToken, rateLimiter, getCachedPendingFixtures, getPendingFixtures);
router.get('/:id', verifyToken, validate.validateId, getFixture);
router.get('/:id/admin', verifyToken, verifyAdmin, validate.validateId, getFixtureForAdmin);
router.patch('/:id', verifyToken, verifyAdmin, validate.validateId, validate.fixture, editFixture);
router.patch('/:id/hometeam/inc', verifyToken, verifyAdmin, validate.validateId, incrementHomeTeamScore);
router.patch('/:id/awayTeam/inc', verifyToken, verifyAdmin, validate.validateId, incrementAwayTeamScore);
router.patch('/:id/hometeam/dcr', verifyToken, verifyAdmin, validate.validateId, decrementHomeTeamScore);
router.patch('/:id/awayteam/dcr', verifyToken, verifyAdmin, validate.validateId, decrementAwayTeamScore);

export default router;
