'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _AccountController = require('../controllers/AccountController');

var _AccountController2 = _interopRequireDefault(_AccountController);

var _Auth = require('../helpers/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _validator = require('../middlewares/validator');

var _validator2 = _interopRequireDefault(_validator);

var _accountSchema = require('../validation/accountSchema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const accountRoute = (0, _express.Router)();

accountRoute.post('/addtype', _Auth2.default.verifyAdminToken('admin'), (0, _validator2.default)(_accountSchema.accountType), _AccountController2.default.addAccountType);
accountRoute.post('/create', _Auth2.default.verifyToken, (0, _validator2.default)(_accountSchema.createAccount), _AccountController2.default.create);

exports.default = accountRoute;