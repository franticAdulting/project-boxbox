import { Container } from 'inversify'
import { DatabaseClient, UserRepository } from '../database'
import { UserService } from '../domain/user/UserService'
import TYPES from './types'

export const container = new Container()
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
