import Knex from 'knex'
import { Model } from 'objection'
import { appConfig } from '../config/appConfig'

const knexConfig = {
  client: 'pg',
  connection: {
    host: appConfig.postgres.host,
    port: appConfig.postgres.port,
    database: appConfig.postgres.database,
    user: appConfig.postgres.user,
    password: appConfig.postgres.password,
  },
  pool: {
    min: appConfig.postgres.minPoolSize,
    max: appConfig.postgres.maxPoolSize,
  },
}

const knex = Knex(knexConfig)

Model.knex(knex)

export class UserModel extends Model {
  public static get tableName() {
    return 'user'
  }
}
