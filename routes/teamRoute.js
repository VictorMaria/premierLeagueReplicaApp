import { Router } from 'express';
import teamController from '../controllers/teamController';
import Authentication from '../middlewares/authentication';
import validate from '../middlewares/teamValidation';
import checkTeam from '../middlewares/checkTeam';

const { addTeam } = teamController;
const { verifyToken, verifyAdmin } = Authentication;

const router = Router();

router.post('/', verifyToken, verifyAdmin, validate.newTeam, checkTeam, addTeam)

export default router;