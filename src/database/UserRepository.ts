import { v4 } from 'uuid'
import { UserModel } from './UserModel'

export interface User {
  id: string
  email: string
}

export class UserRepository {
  private static instance: UserRepository

  public static getInstance(): UserRepository {
    if (!this.instance) {
      this.instance = new UserRepository()
    }

    return this.instance
  }

  public async createUser(email: string): Promise<User> {
    const user = (
      await UserModel.query().insertAndFetch({
        id: v4(),
        email,
      })
    ).toJSON()

    console.log(user)

    return user as User
  }
}
