import { Router } from 'express';
import adminController from '../controllers/adminController';
import validate from '../middlewares/authValidation';
import checkUser from '../middlewares/checkUser';

const { signUpAdmin, signInAdmin } = adminController;

const router = Router();

router.post('/signup', validate.signUp, checkUser, signUpAdmin);
router.post('/signin', validate.signIn, signInAdmin);

export default router;