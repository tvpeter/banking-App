import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import router from './routes/index';

const { NODE_ENV } = process.env;
const app = express();
dotenv.config();
if (NODE_ENV === 'development' || NODE_ENV === 'production') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to our Banking app',
  });
});

app.use('/api/v1', router);

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
