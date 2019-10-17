import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Auth from '../helpers/Auth';
import validator from '../middlewares/validator';
import { signUpSchema, loginSchema } from '../validation/authSchema';


const auth = Router();

auth.post('/signup', validator(signUpSchema), Auth.verifyAdminToken('admin'), AuthController.signup);
auth.post('/signin', validator(loginSchema), AuthController.login);

export default auth;
