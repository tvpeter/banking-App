'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginSchema = exports.signUpSchema = undefined;

var _expressValidator = require('express-validator');

const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/; /* eslint-disable arrow-parens */

const loginSchema = [(0, _expressValidator.check)('email').exists().withMessage('Email is required').trim().not().isEmpty().withMessage('Email must not be empty').isEmail().withMessage('Must be an email address'), (0, _expressValidator.check)('password').exists().withMessage('Password is required').trim().isLength({ min: 8 }).withMessage('Invalid password')];

const signUpSchema = [...loginSchema, (0, _expressValidator.check)('firstName').trim().exists().withMessage('First name is required').isLength({ min: 2, max: 15 }).withMessage('First name should be between 2 to 15 characters').isAlpha().withMessage('First name should only contain alphabets'), (0, _expressValidator.check)('lastName').trim().exists().withMessage('Last name is required').isLength({ min: 2, max: 15 }).withMessage('Last name should be between 2 to 15 characters').isAlpha().withMessage('Last name should only contain alphabets'), (0, _expressValidator.check)('phone').trim().exists().withMessage('phone number is required').isNumeric().isLength(11).withMessage('Invalid phone number'), (0, _expressValidator.check)('dob').exists().withMessage('Date of Birth is required').matches(dateRegex).withMessage("Date must be of the format 'yyyy-mm-dd'").custom(value => {
  const year = value.substring(0, 4);
  const today = new Date().getFullYear();
  if (today - year < 18) {
    return false;
  }
  return true;
}).withMessage('Users must be 18 and above'), (0, _expressValidator.check)('gender').exists().withMessage('Gender is required').matches(/^(male|m|female|f)$/).withMessage('Male or Female is the accepted value')];

exports.signUpSchema = signUpSchema;
exports.loginSchema = loginSchema;