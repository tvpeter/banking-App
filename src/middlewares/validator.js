/* eslint-disable arrow-parens */
import { validationResult } from 'express-validator';
import Response from '../helpers/Response';

/**
 * Schema validator
 * @param {Array} validations
 * @returns {Array} an array of validation schema and middleware
 */
const validate = validations => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const response = new Response(false, 400, 'Validation error', errors.array());

  return res.status(response.code).json(response);
};

export default validate;
