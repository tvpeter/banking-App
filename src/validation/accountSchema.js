/* eslint-disable arrow-parens */
import { check } from 'express-validator';
import db from '../database/models';

const {
  AccountType, Customer, Branch, Account,
} = db;

const accountType = [
  check('name')
    .exists()
    .withMessage('account type name is required')
    .trim()
    .not()
    .isEmpty()
    .withMessage('account type name must not be empty'),
];

const createAccount = [
  check('accountTypeId')
    .exists()
    .withMessage('Select the type of account')
    .custom(async (value) => {
      const acctType = await AccountType.findOne({ where: { id: value } });
      if (!acctType) {
        throw new Error('Supplied account type is not valid');
      }
      return true;
    }),
  check('branchId')
    .exists()
    .withMessage('Branch Id is required')
    .custom(async (value) => {
      const branch = await Branch.findOne({ where: { id: value } });
      if (!branch) {
        throw new Error('Bank branch does not exist');
      }
      return true;
    }),
  check('customerId')
    .exists()
    .withMessage('Id of customer is required')
    .custom(async (value, { req }) => {
      const customer = await Customer.findOne({ where: { id: value } });
      if (!customer) {
        throw new Error('Supplied customer id does not exist');
      }

      const numberOfAccounts = await Account.findOne({
        where: {
          accountTypeId: req.body.accountTypeId,
          customerId: value,
        },
      });
      if (numberOfAccounts) {
        throw new Error('Customer already have the given account type');
      }

      return true;
    }),
];

export { accountType, createAccount };
