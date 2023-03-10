import { PrismaClient } from '@prisma/client'
import { prismaClient } from './DatabaseClient'

export interface User {
  id: string
  email: string
}

export class UserRepository {
  private static instance: UserRepository
  private readonly prismaClient: PrismaClient

  constructor() {
    this.prismaClient = prismaClient
  }

  public static getInstance(): UserRepository {
    if (!this.instance) {
      this.instance = new UserRepository()
    }

    return this.instance
  }

  public async createUser(email: string): Promise<User> {
    const user = await this.prismaClient.user.create({
      data: {
        email,
      },
    })

    return user
  }
}
