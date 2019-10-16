'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressValidator = require('express-validator');

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Schema validator
 * @param {Array} validations
 * @returns {Array} an array of validation schema and middleware
 */
/* eslint-disable arrow-parens */
const validate = validations => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));

  const errors = (0, _expressValidator.validationResult)(req);
  if (errors.isEmpty()) {
    return next();
  }

  const response = new _Response2.default(false, 400, 'Validation error', errors.array());

  return res.status(response.code).json(response);
};

exports.default = validate;