import { inject, injectable } from 'inversify'
import { Err, Ok, Result } from 'ts-results'
import { SError } from 'verror'
import { User, UserRepository } from '../../database'
import TYPES from '../../dependency-injection/types'

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

  public async getUserById(id: string): Promise<User> {
    console.log(`gettingUser: ${id}`)
    return await this.userRepository.getUserById(id)
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
