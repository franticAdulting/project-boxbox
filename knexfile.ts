import type { Knex } from 'knex'

// Update with your config settings.

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'test',
    user: 'postgres',
    password: 'admin',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
}

module.exports = {
  development: knexConfig,
  test: knexConfig,
  staging: knexConfig,
  demo: knexConfig,
  production: knexConfig,
}
