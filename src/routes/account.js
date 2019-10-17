import { Router } from 'express';
import AccountController from '../controllers/AccountController';
import Auth from '../helpers/Auth';
import validator from '../middlewares/validator';
import { accountType, createAccount } from '../validation/accountSchema';


const accountRoute = Router();

accountRoute.post('/addtype', Auth.verifyAdminToken('admin'), validator(accountType), AccountController.addAccountType);
accountRoute.post('/create', Auth.verifyToken, validator(createAccount), AccountController.create);

export default accountRoute;
