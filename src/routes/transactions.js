import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import Auth from '../helpers/Auth';
import validator from '../middlewares/validator';
import transactionSchema from '../validation/transactionSchema';


const transactionRoute = Router();

transactionRoute.post('/credit', Auth.verifyToken, validator(transactionSchema), TransactionController.credit);
transactionRoute.post('/debit', Auth.verifyToken, validator(transactionSchema), TransactionController.debit);

export default transactionRoute;
