'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _BranchController = require('../controllers/BranchController');

var _BranchController2 = _interopRequireDefault(_BranchController);

var _Auth = require('../helpers/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _validator = require('../middlewares/validator');

var _validator2 = _interopRequireDefault(_validator);

var _branchSchema = require('../validation/branchSchema');

var _branchSchema2 = _interopRequireDefault(_branchSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = (0, _express.Router)();

auth.post('/create', _Auth2.default.verifyAdminToken('admin'), (0, _validator2.default)(_branchSchema2.default), _BranchController2.default.create);

exports.default = auth;