import { inject, injectable } from 'inversify'
import { Result } from 'ts-results'
import { SError } from 'verror'
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
  User,
  UserRepository,
} from '../../database'
import TYPES from '../../dependency-injection/types'
import { JobContext } from '../../global/types'

@injectable()
export class UserService {
  private readonly userRepository: UserRepository

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async createUser(
    params: CreateUserParams,
    context: JobContext
  ): Promise<Result<User, SError>> {
    const result = await this.userRepository.createUser(params, context)

    return result
  }

  public async getUserById(
    params: GetUserByIdParams,
    context: JobContext
  ): Promise<Result<User, SError>> {
    const result = await this.userRepository.getUserById(params, context)

    return result
  }

  public async updateUser(
    params: UpdateUserParams,
    context: JobContext
  ): Promise<Result<User, SError>> {
    const result = await this.userRepository.updateUser(params, context)

    return result
  }

  public async deleteUser(
    params: DeleteUserParams,
    context: JobContext
  ): Promise<Result<User, SError>> {
    const result = await this.userRepository.deleteUser(params, context)

    return result
  }
}
