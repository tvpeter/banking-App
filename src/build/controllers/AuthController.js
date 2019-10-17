'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../database/models');

var _models2 = _interopRequireDefault(_models);

var _Auth = require('../helpers/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { User } = _models2.default;

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
        branchId
      } = req.body;

      const hashedPassword = _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(8));
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
        status: 'active'
      });

      const { id } = user;
      const token = _Auth2.default.generateToken(id, email, role);

      const response = new _Response2.default(true, 201, 'User signup successfully', {
        token,
        user: {
          id, email, phone, role, branchId, firstName, lastName
        }
      });

      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new _Response2.default(false, 500, 'server error', err.errors[0].message));
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
        const response = new _Response2.default(false, 401, 'Incorrect login credentials');
        return res.status(response.code).json(response);
      }
      const hash = user.password;
      const result = _bcrypt2.default.compareSync(password, hash);
      if (result) {
        const { id, role } = user;

        const token = _Auth2.default.generateToken(id, email, role);
        const response = new _Response2.default(true, 200, 'user logged in sucessfully', { token });
        return res.status(response.code).json(response);
      }

      const response = new _Response2.default(false, 401, 'Incorrect login credentials');
      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(500).json(new _Response2.default(false, 500, 'server error', error));
    }
  }
}

exports.default = Auth;