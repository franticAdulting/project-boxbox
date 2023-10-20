import Convict from 'convict'
import * as dotenv from 'dotenv'

dotenv.config()

const appConvict = Convict({
  env: {
    format: ['production', 'develop', 'local'],
    default: 'local',
    env: 'NODE_ENV',
  },
  postgres: {
    url: {
      format: String,
      default: '',
      env: 'POSTGRES_URL',
    },
    host: {
      format: String,
      default: 'postgres',
      env: 'POSTGRES_HOST',
    },
    port: {
      format: 'port',
      default: 5432,
      env: 'POSTGRES_PORT',
    },
    database: {
      format: String,
      default: 'test',
      env: 'POSTGRES_DB',
    },
    user: {
      format: String,
      default: 'postgres',
      env: 'POSTGRES_USER',
    },
    password: {
      format: String,
      default: 'admin',
      env: 'POSTGRES_PASSWORD',
    },
    minPoolSize: {
      format: Number,
      default: 2,
      env: 'POSTGRES_MIN_POOL_SIZE',
    },
    maxPoolSize: {
      format: Number,
      default: 10,
      env: 'POSTGRES_MAX_POOL_SIZE',
    },
  },
})

export const appConfig = appConvict.getProperties()
