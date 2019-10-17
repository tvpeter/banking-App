'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _branch = require('./branch');

var _branch2 = _interopRequireDefault(_branch);

var _customer = require('./customer');

var _customer2 = _interopRequireDefault(_customer);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _transactions = require('./transactions');

var _transactions2 = _interopRequireDefault(_transactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

router.use('/auth', _auth2.default);
router.use('/branch', _branch2.default);
router.use('/customer', _customer2.default);
router.use('/account', _account2.default);
router.use('/transaction', _transactions2.default);

exports.default = router;