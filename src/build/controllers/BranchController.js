'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../database/models');

var _models2 = _interopRequireDefault(_models);

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { Branch } = _models2.default;

/** authentication controller class */
class BranchController {
  /**
   * @description - this method creates user
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async create(req, res) {
    try {
      const {
        name, location, email, address
      } = req.body;

      const { dataValues } = await Branch.create({
        name,
        location,
        email,
        address
      });

      const response = new _Response2.default(true, 201, 'Branch created successfully', dataValues);
      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new _Response2.default(false, 500, 'server error', err.errors[0].message));
    }
  }
}

exports.default = BranchController;