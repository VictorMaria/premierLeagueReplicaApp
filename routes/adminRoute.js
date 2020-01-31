import { Router } from 'express';
import adminController from '../controllers/adminController';
import validate from '../middlewares/authValidation';
import checkUser from '../middlewares/checkUser';

const { signUpAdmin } = adminController;

const router = Router();

router.post('/signup', validate.signUp, checkUser, signUpAdmin);

export default router;