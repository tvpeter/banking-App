'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _Response = require('./Response');

var _Response2 = _interopRequireDefault(_Response);

var _models = require('../database/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { User } = _models2.default;

_dotenv2.default.config();
const secret = process.env.TOKEN_SECRET;

/** Token Helper Class */
class Auth {
  /**
   * @description - this method encodes a token
   * @param {Number} userId
   * @param {String} userEmail
   * @param {String} role
   * @return {String} token
   */
  static generateToken(userId, userEmail, role) {
    const token = _jsonwebtoken2.default.sign({ userId, userEmail, role }, secret, { expiresIn: '24h' });
    return token;
  }

  /**
   * Verfify Token Method
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} returns the token object payload
   * @memberof Token
  */
  static async verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'] || req.query.token || req.body.token;
    try {
      if (!token) {
        const response = new _Response2.default(false, 401, 'Unathorized, You did not provide a token');
        return res.status(response.code).json(response);
      }
      const decoded = _jsonwebtoken2.default.verify(token, secret);
      const user = await User.findOne({
        where: { id: decoded.userId, email: decoded.userEmail }
      });

      if (!user || user.status !== 'active') {
        return res.status(401).json(new _Response2.default(false, 401, 'You don\'t have permission to access this route'));
      }
      req.payload = decoded;
      return next();
    } catch (err) {
      const response = new _Response2.default(false, 401, 'Unauthorized, Your token is invalid or expired');
      return res.status(response.code).json(response);
    }
  }

  /**
   * Verify admin user
   * @static
   * @param {string} role - User role
   * @param {object} req - HTTP Request object
   * @param {object} res  - HTTP Response object
   * @param {function} next - callback function
   * @returns {object} returns admin token
   */
  static verifyAdminToken(role) {
    return async (req, res, next) => {
      const token = req.headers.authorization || req.headers['x-access-token'] || req.query.token || req.body.token;
      if (!token) {
        return res.status(401).json(new _Response2.default(false, 401, 'Unauthorized, You did not provide a token'));
      }
      try {
        const decoded = _jsonwebtoken2.default.verify(token, secret);
        const user = await User.findOne({
          where: { id: decoded.userId, email: decoded.userEmail, role }
        });

        if (!user || user.status !== 'active') {
          return res.status(401).json(new _Response2.default(false, 401, `Only active ${role}s can access this resource`));
        }
        req.payload = decoded;
        return next();
      } catch (error) {
        return res.status(401).json(new _Response2.default(false, 401, 'Unauthorized, invalid token'));
      }
    };
  }
}

exports.default = Auth;