import db from '../database/models';
import Response from '../helpers/Response';

const { Transaction, Account } = db;

/** authentication controller class */
class TransactionController {
  /**
   * @description - this method credits a users account
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


      const { id, balance } = await Account.findOne({
        where: { accountNumber }, attributes: ['id', 'balance'],
      });
      const sum = Number(balance) + Number(amount);

      const accountBalance = await Account.update({ balance: sum },
        {
          where: { id, accountNumber },
          returning: true,
          plain: true,
        });

      await Transaction.create({
        type, userId, accountNumber, amount, description,
      });

      const response = new Response(
        true, 200, 'Account credited successfully',
        {
          type,
          accountNumber,
          amount,
          description,
          userId,
          balance: accountBalance[1].dataValues.balance,
        },
      );

      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new Response(false, 500, 'server error', err));
    }
  }

  /**
   * @description - this method debits a users account
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async debit(req, res) {
    const type = 'debit';
    const { userId } = req;
    try {
      const { accountNumber, amount, description } = req.body;


      const { id, balance } = await Account.findOne({
        where: { accountNumber }, attributes: ['id', 'balance'],
      });

      if (Number(amount) >= Number(balance)) {
        return res.status(422).json(new Response(false, 422, 'Insufficient balance'));
      }

      const remainingBalance = Number(balance) - Number(amount);

      await Account.update({ balance: remainingBalance },
        {
          where: { id, accountNumber },
          returning: true,
          plain: true,
        });

      const { dataValues } = await Transaction.create({
        type, userId, accountNumber, amount, description,
      });

      const response = new Response(
        true, 200, 'Account debited successfully',
        {
          id: dataValues.id,
          type,
          accountNumber,
          amount,
          description,
          userId,
          balance: remainingBalance,
        },
      );

      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new Response(false, 500, 'server error', err));
    }
  }
}

export default TransactionController;
