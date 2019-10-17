import { Router } from 'express';
import BranchController from '../controllers/BranchController';
import Auth from '../helpers/Auth';
import validator from '../middlewares/validator';
import branchSchema from '../validation/branchSchema';


const auth = Router();

auth.post('/create', Auth.verifyAdminToken('admin'), validator(branchSchema), BranchController.create);

export default auth;
