import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import validator from '../middlewares/validator';
import { signUpSchema, loginSchema } from '../validation/authSchema';


const auth = Router();

auth.post('/signup', validator(signUpSchema), AuthController.signup);
auth.post('/signin', validator(loginSchema), AuthController.login);

export default auth;
