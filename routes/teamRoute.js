import { Router } from 'express';
import teamController from '../controllers/teamController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/teamValidation';
import checkTeam from '../middlewares/checkTeam';
import Cache from '../helpers/cache';
import rateLimiter from '../middlewares/rateLimiter';

const { addTeam, getAllTeams, getTeam } = teamController;
const { verifyToken, verifyAdmin } = Authentication;
const { getCachedTeams } = Cache;

const router = Router();

router.post('/', verifyToken, verifyAdmin, validate.newTeam, checkTeam, addTeam);
router.get('/', verifyToken, rateLimiter, getCachedTeams, getAllTeams);
router.get('/:id', verifyToken, validate.validateId, getTeam);

export default router;