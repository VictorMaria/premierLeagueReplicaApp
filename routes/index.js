import { Router } from 'express';
import authRoute from './authRoute';
import adminRoute from './adminRoute';

const router = Router();

router.use('/auth', authRoute);
router.use('/admin', adminRoute);

export default router;
