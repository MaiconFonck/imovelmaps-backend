require('dotenv').config();
const { parse } = require('pg-connection-string');

const isProduction = process.env.NODE_ENV === 'production';

const baseConfig = {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {}
};

if (isProduction) {
  const config = parse(process.env.DATABASE_URL);

  module.exports = {
    production: {
      username: config.user,
      password: config.password,
      database: config.database,
      host: config.host,
      port: config.port,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false
    }
  };
} else {
  module.exports = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false
    },
    test: {
      dialect: 'sqlite',
      storage: ':memory:'
    }
  };
}
