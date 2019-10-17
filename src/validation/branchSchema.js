/* eslint-disable arrow-parens */
import { check } from 'express-validator';

const branchSchema = [
  check('name')
    .exists()
    .withMessage('name is required')
    .trim()
    .not()
    .isEmpty()
    .withMessage('name must not be empty'),
  check('location')
    .exists()
    .withMessage('location is required')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Invalid branch location name'),
  check('email')
    .exists()
    .withMessage('branch email is required')
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Email must not be empty'),
  check('address')
    .exists()
    .withMessage('branch address is required')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 12 })
    .withMessage('Supply a descriptive address'),
];

export default branchSchema;
