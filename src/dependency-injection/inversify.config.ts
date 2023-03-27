import { DatabaseClient, UserRepository } from '@database/index'
import { TYPES } from '@di/index'
import { Container } from 'inversify'
import { UserService } from '../domain/user/UserService'

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
