import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { DatabaseClient } from '../DatabaseClient'
import { User } from './UserRepository'

export interface DoBefore {
  id: string
  description: string
  endDate: Date
  user: User
}

@injectable()
export class DoBeforeRepository {
  private readonly prismaClient: PrismaClient

  constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
    this.prismaClient = databaseClient.getPrismaClient()
  }

  public async createDoBefore(
    userId: string,
    description: string,
    endDate: Date
  ): Promise<DoBefore> {
    const doBefore = await this.prismaClient.doBefore.create({
      data: {
        description,
        endDate,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
      },
    })

    return doBefore
  }

  public async getDoBeforeById(id: string): Promise<DoBefore> {
    const doBefore = await this.prismaClient.doBefore.findFirstOrThrow({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        user: true,
      },
    })

    return doBefore
  }

  public async updateDoBefore(
    id: string,
    description?: string,
    endDate?: Date
  ): Promise<DoBefore> {
    const doBefore = await this.prismaClient.doBefore.findFirstOrThrow({
      where: {
        id,
        isDeleted: false,
      },
    })

    return await this.prismaClient.doBefore.update({
      where: {
        id,
      },
      data: {
        description: description ?? doBefore.description,
        endDate: endDate ?? doBefore.endDate,
      },
      include: {
        user: true,
      },
    })
  }

  public async deleteDoBefore(id: string): Promise<DoBefore> {
    await this.prismaClient.doBefore.findFirstOrThrow({
      where: {
        id,
        isDeleted: false,
      },
    })

    return await this.prismaClient.doBefore.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
      include: {
        user: true,
      },
    })
  }
}
