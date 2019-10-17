import { Router } from 'express';
import authRoute from './auth';
import branchRoute from './branch';
import customerRoute from './customer';

const router = Router();

router.use('/auth', authRoute);
router.use('/branch', branchRoute);
router.use('/customer', customerRoute);

export default router;
