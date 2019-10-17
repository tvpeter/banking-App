/* eslint-disable arrow-parens */
import { check } from 'express-validator';
import db from '../database/models';

const { Account } = db;

const transactionSchema = [
  check('accountNumber')
    .exists()
    .withMessage('Supply account number for transaction')
    .custom(async (value) => {
      const account = await Account.findOne({ where: { accountNumber: value } });
      if (!account) {
        throw new Error('Supplied account is not found');
      }
      return true;
    }),
  check('amount')
    .exists()
    .withMessage('Transaction amount is required'),
  check('description')
    .exists()
    .withMessage('Id of customer is required')
];

export default transactionSchema;
