module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'herbs-project',
      user: 'postgres',
      password: 'postgres',
      host: 'localhost',
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/infra/data/database/migrations',
      tableName: 'knex_migrations',
    },
  },
  staging: {},
  production: {},
};
