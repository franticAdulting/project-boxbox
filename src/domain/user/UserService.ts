import { User, UserRepository } from '@database/index'
import { TYPES } from '@di/index'
import { inject, injectable } from 'inversify'
import { Err, Ok, Result } from 'ts-results'
import { SError } from 'verror'

@injectable()
export class UserService {
  private readonly userRepository: UserRepository

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async createUser(email: string): Promise<Result<User, SError>> {
    if (!email) {
      return Err(new SError('Invalid email', email))
    }

    console.log('creatingUser: ', email)

    const user = await this.userRepository.createUser(email)

    return Ok(user)
  }

  public async getUserById(
    id: string,
    traceId: string
  ): Promise<Result<User, SError>> {
    console.log(`gettingUser: ${id}`)
    const result = await this.userRepository.getUserById(id, traceId)

    return result
  }

  public async updateUser(id: string, email?: string): Promise<User> {
    console.log('updating user: ', id, email)
    return await this.userRepository.updateUser(id, email)
  }

  public async deleteUser(id: string): Promise<User> {
    console.log('deleting user: ', id)
    return await this.userRepository.deleteUser(id)
  }
}
