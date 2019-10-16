import bcrypt from 'bcrypt';
import db from '../database/models';
import jwtHelper from '../helpers/Auth';
import Response from '../helpers/Response';

const { User } = db;

/** authentication controller class */
class Auth {
  /**
   * @description - this method creates user
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async signup(req, res) {
    try {
      const {
        firstName, lastName, email, phone, password, gender, dob, role,
        branchId,
      } = req.body;

      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
      const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        gender,
        dob,
        role,
        branchId,
        status: 'active',
      });

      const { id } = user;
      const token = jwtHelper.generateToken(id, email, role);

      const response = new Response(
        true, 201, 'User signup successfully',
        {
          token,
          user: {
            id, email, phone, role, branchId, firstName, lastName,
          },
        },
      );

      return res.status(response.code).json(response);
    } catch (err) {
      return (err.routine === '_bt_check_unique') ? res.status(400).json(new Response(false, 400, 'Email/phone number already taken'))
        : res.status(500).json(new Response(false, 500, 'Server error'));
    }
  }
}

export default Auth;
