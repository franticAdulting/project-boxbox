import { inject, injectable } from 'inversify'
import { User, UserRepository } from '../database'

@injectable()
export class UserServices {
  private readonly userRepository: UserRepository

  constructor(@inject(UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async createUser(email: string): Promise<User> {
    console.log('creatingUser: ', email)
    return await this.userRepository.createUser(email)
  }

  // public async getUserById(id: string): Promise<User> {
  //   console.log(`gettingUser: ${id}`)
  //   return await this.userRepository.getUserById(id)
  // }

  public async updateUser(id: string, email?: string): Promise<User> {
    console.log('updating user: ', id, email)
    return await this.userRepository.updateUser(id, email)
  }

  public async deleteUser(id: string): Promise<User> {
    console.log('deleting user: ', id)
    return await this.userRepository.deleteUser(id)
  }
}
