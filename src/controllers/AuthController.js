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
      return res.status(500).json(new Response(false, 500, 'server error', err.errors[0].message));
    }
  }

  /**
   * @description - this method logs a user into the system
   *
   * @param {object} req - the request object
   * @param {object} res  - the response object
   * @returns {object} - object
   */
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        const response = new Response(false, 401, 'Incorrect login credentials here');
        return res.status(response.code).json(response);
      }
      const hash = user.password;
      const result = bcrypt.compareSync(password, hash);
      if (result) {
        const { id, role } = user;

        const token = jwtHelper.generateToken(id, email, role);
        const response = new Response(true, 200, 'user logged in sucessfully', { token });
        return res.status(response.code).json(response);
      }

      const response = new Response(false, 401, 'Incorrect login credentials');
      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(500).json(new Response(false, 500, 'server error', error.errors[0].message));
    }
  }
}

export default Auth;
