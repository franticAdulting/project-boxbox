import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import TYPES from '../../dependency-injection/types'
import { DatabaseClient } from '../DatabaseClient'
import { User } from '../types'

@injectable()
export class UserRepository {
  private readonly prismaClient: PrismaClient

  constructor(@inject(TYPES.DatabaseClient) databaseClient: DatabaseClient) {
    this.prismaClient = databaseClient.getPrismaClient()
  }

  public async createUser(email: string): Promise<User> {
    const user = await this.prismaClient.user.create({
      data: {
        email,
      },
    })

    return user
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.prismaClient.user.findFirstOrThrow({
      where: {
        id,
      },
    })

    return user
  }

  public async updateUser(id: string, email?: string): Promise<User> {
    await this.prismaClient.user.findFirstOrThrow({
      where: {
        id,
      },
    })

    return await this.prismaClient.user.update({
      where: {
        id,
      },
      data: {
        email,
      },
    })
  }

  public async deleteUser(id: string): Promise<User> {
    return await this.prismaClient.user.delete({
      where: {
        id,
      },
    })
  }
}
