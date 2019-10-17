'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../database/models');

var _models2 = _interopRequireDefault(_models);

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { Customer } = _models2.default;

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
        firstName, lastName, email, phone, gender, dob
      } = req.body;

      const { dataValues } = await Customer.create({
        firstName,
        lastName,
        email,
        phone,
        gender,
        dob,
        status: 'active'
      });

      const response = new _Response2.default(true, 201, 'Customer registered successfully', dataValues);

      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new _Response2.default(false, 500, 'server error', err.errors[0].message));
    }
  }
}

exports.default = CustomerController;