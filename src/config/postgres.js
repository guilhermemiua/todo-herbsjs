const env = require('sugar-env');
require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    host: env.get('PG_HOST'),
    user: env.get('PG_USER'),
    password: env.get('PG_PASSWORD'),
    database: env.get('PG_DATABASE'),
    port: env.get('PG_PORT'),
  },
};
