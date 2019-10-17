'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _CustomersController = require('../controllers/CustomersController');

var _CustomersController2 = _interopRequireDefault(_CustomersController);

var _validator = require('../middlewares/validator');

var _validator2 = _interopRequireDefault(_validator);

var _customerSchema = require('../validation/customerSchema');

var _customerSchema2 = _interopRequireDefault(_customerSchema);

var _Auth = require('../helpers/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const customerRoute = (0, _express.Router)();

customerRoute.post('/register', _Auth2.default.verifyToken, (0, _validator2.default)(_customerSchema2.default), _CustomersController2.default.register);

exports.default = customerRoute;