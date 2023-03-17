import { UserRepository } from '../database/repository/UserRepository'

export class UserServices {
  public static instance: UserServices

  public static getInstance(): UserServices {
    if (!this.instance) {
      this.instance = new UserServices()
    }

    return this.instance
  }

  public async createUser(email: string) {
    await UserRepository.getInstance().createUser(email)
    console.log('creatingUser: ', email)
  }

  public async getUserById(id: string) {
    console.log(`gettingUser: ${id}`)
  }

  public async updateUser(id: string, email?: string) {
    console.log('updating user: ', id, email)
  }

  public async deleteUser(id: string) {
    console.log('deleting user: ', id)
  }
}
