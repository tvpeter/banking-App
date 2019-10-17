'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _CustomersController = require('../controllers/CustomersController');

var _CustomersController2 = _interopRequireDefault(_CustomersController);

var _validator = require('../middlewares/validator');

var _validator2 = _interopRequireDefault(_validator);

var _authSchema = require('../validation/authSchema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const customerRoute = (0, _express.Router)();

customerRoute.post('/register', (0, _validator2.default)(_authSchema.signUpSchema), _CustomersController2.default.register);

exports.default = customerRoute;