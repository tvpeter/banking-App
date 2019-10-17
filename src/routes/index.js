import { Router } from 'express';
import authRoute from './auth';
import branchRoute from './branch';
import customerRoute from './customer';
import accountRoute from './account';
import transactionRoute from './transactions';

const router = Router();

router.use('/auth', authRoute);
router.use('/branch', branchRoute);
router.use('/customer', customerRoute);
router.use('/account', accountRoute);
router.use('/transaction', transactionRoute);


export default router;
