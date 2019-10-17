'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressValidator = require('express-validator');

const branchSchema = [(0, _expressValidator.check)('name').exists().withMessage('name is required').trim().not().isEmpty().withMessage('name must not be empty'), (0, _expressValidator.check)('location').exists().withMessage('location is required').trim().isLength({ min: 8 }).withMessage('Invalid branch location name'), (0, _expressValidator.check)('email').exists().withMessage('branch email is required').trim().not().isEmpty().isEmail().withMessage('Email must not be empty'), (0, _expressValidator.check)('address').exists().withMessage('branch address is required').trim().not().isEmpty().isLength({ min: 12 }).withMessage('Supply a descriptive address')]; /* eslint-disable arrow-parens */
exports.default = branchSchema;