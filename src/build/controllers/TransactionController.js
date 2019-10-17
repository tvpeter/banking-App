'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../database/models');

var _models2 = _interopRequireDefault(_models);

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { Transaction, Account, Customer } = _models2.default;

/** authentication controller class */
class TransactionController {
  /**
   * @description - this method creates account type
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async credit(req, res) {
    const type = 'credit';
    const { userId } = req;
    try {
      const { accountNumber, amount, description } = req.body;

      const { dataValues } = await Transaction.create({
        type, userId, accountNumber, amount, description
      });

      const balance = await Account.findOne({
        where: { accountNumber }, attributes: ['balance']
      });

      console.log(balance);

      const response = new _Response2.default(true, 200, 'Account type created successfully', dataValues);

      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new _Response2.default(false, 500, 'server error', err));
    }
  }

  /**
   * @description - this method creates customer account
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async debit(req, res) {
    const accountNumber = Number(Date.now().toString().substring(3));
    const { userId } = req.payload;
    const balance = 2;

    try {
      const {
        accountTypeId, customerId, branchId
      } = req.body;

      const { dataValues } = await Account.create({
        accountTypeId, accountNumber, customerId, branchId, userId, balance
      });

      const customerInfo = await Customer.findOne({
        where: { id: customerId }, attributes: ['firstName', 'lastName']
      });

      const accountType = await AccountType.findOne({
        where: { id: accountTypeId }, attributes: ['name']
      });

      const response = new _Response2.default(true, 201, 'Customer account created successfully', { dataValues, customerInfo, accountType });

      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new _Response2.default(false, 500, 'server error', err.errors[0].message));
    }
  }
}

exports.default = TransactionController;