import { Router } from 'express';
import teamController from '../controllers/teamController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/teamValidation';
import checkTeam from '../middlewares/checkTeam';
import Cache from '../helpers/cache';
import rateLimiter from '../middlewares/rateLimiter';

const { addTeam, getAllTeams, getTeam, editTeam, search, deleteTeam } = teamController;
const { verifyToken, verifyAdmin } = Authentication;
const { getCachedTeams, getCachedSearchResults } = Cache;

const router = Router();

router.post('/', verifyToken, verifyAdmin, validate.newTeam, checkTeam, addTeam);
// Search route is the only one that requires no authentication
router.get('/search', getCachedSearchResults, search);
router.get('/', verifyToken, rateLimiter, getCachedTeams, getAllTeams);
router.get('/:id', verifyToken, validate.validateId, getTeam);
router.patch('/:id', verifyToken, verifyAdmin, validate.validateId, editTeam);
router.delete('/:id', verifyToken, verifyAdmin, validate.validateId, deleteTeam);

export default router;