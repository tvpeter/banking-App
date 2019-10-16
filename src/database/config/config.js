import dotenv from 'dotenv';

dotenv.config();
const {
  DEV_DB_NAME, DB_USERNAME, DB_PASSWORD, DEV_DB_HOST,
  TEST_DB_NAME, DB_PORT,
} = process.env;
const dialect = 'postgres';

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DEV_DB_NAME,
    host: DEV_DB_HOST,
    port: process.env.DB_PORT,
    dialect,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: TEST_DB_NAME,
    host: DEV_DB_HOST,
    port: DB_PORT,
    logging: false,
    dialect,
  },
  production: {
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.PRODUCTION_HOST,
    port: process.env.PRODUCTION_PORT,
    logging: false,
    dialect,
    ssl: true,
  },
};
