'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _AuthController = require('../controllers/AuthController');

var _AuthController2 = _interopRequireDefault(_AuthController);

var _validator = require('../middlewares/validator');

var _validator2 = _interopRequireDefault(_validator);

var _authSchema = require('../validation/authSchema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = (0, _express.Router)();

auth.post('/signup', (0, _validator2.default)(_authSchema.signUpSchema), _AuthController2.default.signup);
auth.post('/signin', (0, _validator2.default)(_authSchema.loginSchema), _AuthController2.default.login);

exports.default = auth;