import { Router } from 'express';
import CustomerController from '../controllers/CustomersController';
import validator from '../middlewares/validator';
import customerSchema from '../validation/customerSchema';
import Auth from '../helpers/Auth';

const customerRoute = Router();

customerRoute.post('/register', Auth.verifyToken, validator(customerSchema), CustomerController.register);

export default customerRoute;
