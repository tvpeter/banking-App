'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _TransactionController = require('../controllers/TransactionController');

var _TransactionController2 = _interopRequireDefault(_TransactionController);

var _Auth = require('../helpers/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import validator from '../middlewares/validator';


const transactionRoute = (0, _express.Router)();

transactionRoute.post('/credit', _Auth2.default.verifyToken, _TransactionController2.default.credit);
// transactionRoute.post('/create', Auth.
// verifyToken, validator(createAccount), AccountController.create);

exports.default = transactionRoute;