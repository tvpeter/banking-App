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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

router.use('/auth', _auth2.default);
router.use('/branch', _branch2.default);
router.use('/customer', _customer2.default);

exports.default = router;