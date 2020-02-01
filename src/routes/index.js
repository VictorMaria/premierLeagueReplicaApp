import { Router } from 'express';
import authRoute from './authRoute';
import adminRoute from './adminRoute';
import teamRoute from './teamRoute';
import fixtureRoute from './fixtureRoute';

const router = Router();

router.use('/auth', authRoute);
router.use('/admin', adminRoute);
router.use('/teams', teamRoute);
router.use('/fixtures', fixtureRoute);

export default router;
