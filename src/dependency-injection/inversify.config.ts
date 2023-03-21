import { Container } from 'inversify'
import { UserRepository } from '../database'
import { DatabaseClient } from '../database/DatabaseClient'
import { UserService } from '../domain/user/UserService'
import TYPES from './types'

const container = new Container()
container
  .bind<DatabaseClient>(TYPES.DatabaseClient)
  .to(DatabaseClient)
  .inSingletonScope()
container
  .bind<UserRepository>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope()
container
  .bind<UserService>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope()

export { container }
