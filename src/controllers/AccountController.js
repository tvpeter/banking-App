import db from '../database/models';
import Response from '../helpers/Response';

const { AccountType, Account, Customer } = db;

/** authentication controller class */
class AccountController {
  /**
   * @description - this method creates account type
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async addAccountType(req, res) {
    try {
      const { name } = req.body;

      const { dataValues } = await AccountType.create({ name });

      const response = new Response(
        true, 201, 'Account type created successfully',
        dataValues,
      );

      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new Response(false, 500, 'server error', err));
    }
  }

  /**
   * @description - this method creates customer account
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async create(req, res) {
    const accountNumber = Number(Date.now().toString().substring(3));
    const { userId } = req.payload;
    const balance = 2;

    try {
      const {
        accountTypeId, customerId, branchId,
      } = req.body;

      const { dataValues } = await Account.create({
        accountTypeId, accountNumber, customerId, branchId, userId, balance,
      });

      const customerInfo = await Customer.findOne({
        where: { id: customerId }, attributes: ['firstName', 'lastName'],
      });

      const accountType = await AccountType.findOne({
        where: { id: accountTypeId }, attributes: ['name'],
      });

      const response = new Response(
        true, 201, 'Customer account created successfully',
        { dataValues, customerInfo, accountType },
      );

      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new Response(false, 500, 'server error', err.errors[0].message));
    }
  }
}

export default AccountController;
