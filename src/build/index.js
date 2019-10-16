'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { NODE_ENV } = process.env;
const app = (0, _express2.default)();
_dotenv2.default.config();
if (NODE_ENV === 'development' || NODE_ENV === 'production') {
  app.use((0, _morgan2.default)('dev'));
}
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to our Banking app'
  });
});

const port = process.env.PORT || 3000;

app.listen(port);