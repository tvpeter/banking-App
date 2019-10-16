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

      const verificationToken = _Auth2.default.generateToken(user.id, email, role);
      // const verificationLink = `http://${req.headers.host}/api/v1/auth/verify?token=${verificationToken}`;
      // await EmailNotifications.signupEmail(email, verificationLink, firstName);

      const response = new _Response2.default(true, 201, 'User signup successfully', {
        user: {
          email, phone, verificationToken, role, branchId
        }
      });
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new _Response2.default(false, 500, 'Server error, Please try again later');
      return res.status(response.code).json(response);
    }
  }

  /**
   * @description - this method creates user
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async companySignup(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        gender,
        dob,
        companyName,
        address,
        code
      } = req.body;
      const hashedPassword = hashPassword(password);
      const company = await Company.create({
        name: companyName,
        address,
        code,
        owner: email
      });

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        gender,
        dob,
        companyId: company.id,
        role: 'manager'
      });

      await Company.update({ owner: user.id }, { where: { id: company.id } });

      const {
        id,
        role,
        companyId,
        status
      } = user;
      const token = _Auth2.default.generateToken({
        id,
        email,
        role,
        companyId,
        status
      });
      const verificationToken = _Auth2.default.generateToken({ email });
      const verificationLink = `${req.hostname}?token=${verificationToken}`;
      await EmailNotifications.signupEmail(email, verificationLink, firstName);

      const response = new _Response2.default(true, 201, 'User signup successfully', { user: { email, token } });
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new _Response2.default(false, 500, 'Server error, Please try again later');
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @description Sends password reset mail
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} JSON Response
   */
  static async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        const response = new _Response2.default(false, 404, 'Email does not exist');
        return res.status(response.code).json(response);
      }
      const { id, password: secret } = user.dataValues;
      // create reset token
      const resetToken = _Auth2.default.generateToken({ userId: id }, secret, '1h');
      // send mail
      sendPasswordResetMail(req, user, resetToken);
      const response = new _Response2.default(true, 200, 'Password reset mail sent');
      return res.status(response.code).json(response);
    } catch (error) {
      const response = new _Response2.default(false, 500, 'Server error, Please try again later');
      return res.status(response.code).json(response);
    }
  }

  /**
  * @static
  * @description Reset's user password
  * @param {object} req Request Object
  * @param {object} res Response Object
  * @returns {object} JSON Response
  */
  static async resetPassword(req, res) {
    const { password } = req.body;
    const { resetToken } = req.params;
    // get user id from reset token;
    const { payload } = jwt.decode(resetToken) || {};
    const { userId } = payload || {};
    // check if user exists
    try {
      const user = await User.findOne({ where: { id: userId || null } });
      if (!user) {
        const response = new _Response2.default(false, 404, 'User does not exist');
        return res.status(response.code).json(response);
      }
      // get reset secret (use user's password as secret to make token one time use only)
      const { password: secret } = user.dataValues;
      jwt.verify(resetToken, secret);
      const passwordHash = hashHelper.hashPassword(password);
      // update user's password
      await User.update({ password: passwordHash }, { where: { id: userId } });
      const response = new _Response2.default(true, 200, 'Password reset successful');
      return res.status(response.code).json(response);
    } catch (error) {
      if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
        const response = new _Response2.default(false, 400, 'Expired reset link');
        return res.status(response.code).json(response);
      }
      const response = new _Response2.default(false, 500, 'Server error, Please try again later');
      return res.status(response.code).json(response);
    }
  }

  /**
   * @description - this method login user
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async login(req, res) {
    const { email, password, code } = req.body;
    const company = await SearchDb.findCompany(code);
    const unauthorizedCode = 401;
    if (!company) {
      const response = new _Response2.default(false, unauthorizedCode, 'Incorrect company code', {});
      return res.status(response.code).json(response);
    }
    const companyId = company.id;
    const user = await User.findOne({ where: { email, companyId } });
    if (!user) {
      const response = new _Response2.default(false, unauthorizedCode, 'Incorrect email or password', {});
      return res.status(response.code).json(response);
    }
    const hash = user.password;
    const result = hashHelper.comparePassword(hash, password);
    if (result) {
      const {
        id, role, status
      } = user;
      const token = _Auth2.default.generateToken({
        id,
        email,
        role,
        companyId,
        status
      });
      const response = new _Response2.default(true, 200, 'user logged in sucessfully', { user: { email, token } });
      return res.status(response.code).json(response);
    }
    const response = new _Response2.default(false, unauthorizedCode, 'Incorrect email or password');
    return res.status(response.code).json(response);
  }

  /**
   * @description - this method Verifies a user
   *
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   *
   * @returns {object} - object
   */
  static async verifyEmail(req, res) {
    try {
      const { payload } = req.payload;
      const { email } = payload;
      const user = await User.findOne({ where: { email } });
      if (user.status === 'active') {
        const response = new _Response2.default(false, 403, 'Your account has already been verified');
        return res.status(response.code).json(response);
      }
      const updateStatus = { status: 'active' };
      await user.update(updateStatus);
      const response = new _Response2.default(true, 200, 'Account verification was successful');
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new _Response2.default(false, 500, 'Server error, Please try again later');
      return res.status(response.code).json(response);
    }
  }
}

exports.default = Auth;