'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAccount = exports.accountType = undefined;

var _expressValidator = require('express-validator');

var _models = require('../database/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable arrow-parens */
const {
  AccountType, Customer, Branch, Account
} = _models2.default;

const accountType = [(0, _expressValidator.check)('name').exists().withMessage('account type name is required').trim().not().isEmpty().withMessage('account type name must not be empty')];

const createAccount = [(0, _expressValidator.check)('accountTypeId').exists().withMessage('Select the type of account').custom(async value => {
  const acctType = await AccountType.findOne({ where: { id: value } });
  if (!acctType) {
    throw new Error('Supplied account type is not valid');
  }
  return true;
}), (0, _expressValidator.check)('branchId').exists().withMessage('Branch Id is required').custom(async value => {
  const branch = await Branch.findOne({ where: { id: value } });
  if (!branch) {
    throw new Error('Bank branch does not exist');
  }
  return true;
}), (0, _expressValidator.check)('customerId').exists().withMessage('Id of customer is required').custom(async (value, { req }) => {
  const customer = await Customer.findOne({ where: { id: value } });
  if (!customer) {
    throw new Error('Supplied customer id does not exist');
  }

  const numberOfAccounts = await Account.findOne({
    where: {
      accountTypeId: req.body.accountTypeId,
      customerId: value
    }
  });
  if (numberOfAccounts) {
    throw new Error('Customer already have the given account type');
  }

  return true;
})];

exports.accountType = accountType;
exports.createAccount = createAccount;