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

var _authSchema2 = _interopRequireDefault(_authSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = (0, _express.Router)();

auth.post('/signup', (0, _validator2.default)(_authSchema2.default), _AuthController2.default.signup);

exports.default = auth;