import db from '../database/models';
import Response from '../helpers/Response';

const { Customer } = db;

/** authentication controller class */
class CustomerController {
  /**
   * @description - this method creates user
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async register(req, res) {
    try {
      const {
        firstName, lastName, email, phone, gender, dob,
      } = req.body;

      const { dataValues } = await Customer.create({
        firstName,
        lastName,
        email,
        phone,
        gender,
        dob,
        status: 'active',
      });

      const response = new Response(
        true, 201, 'Customer registered successfully',
        dataValues,
      );

      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new Response(false, 500, 'server error', err.errors[0].message));
    }
  }
}

export default CustomerController;
