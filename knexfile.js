module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'todo',
      user: 'user',
      password: '123456',
      host: 'todo-pg',
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
