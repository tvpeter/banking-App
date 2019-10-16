import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import validator from '../middlewares/validator';
import authSchema from '../validation/authSchema';


const auth = Router();

auth.post('/signup', validator(authSchema), AuthController.signup);

export default auth;
