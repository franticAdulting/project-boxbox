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
      },
      include: {
        user: true,
      },
    })

    return doBefore
  }

  public async fetchDoBeforeByUserId(userId: string): Promise<DoBefore[]> {
    return await this.prismaClient.doBefore.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    })
  }

  // Fetches all DoBefores that end after the given date (exclusive).
  public async fetchDoBeforeAfter(after: Date): Promise<DoBefore[]> {
    return await this.prismaClient.doBefore.findMany({
      where: {
        endDate: {
          gt: after,
        },
      },
      include: {
        user: true,
      },
    })
  }

  // Fetches all DoBefores that end before the given date (inclusive).
  public async fetchDoBeforeBefore(before: Date): Promise<DoBefore[]> {
    return await this.prismaClient.doBefore.findMany({
      where: {
        endDate: {
          lte: before,
        },
      },
      include: {
        user: true,
      },
    })
  }

  // Fetches all DoBefores that end after a given date (exclusive) and before a given date (inclusive).
  public async fetchDoBeforeBetween(
    after: Date,
    before: Date
  ): Promise<DoBefore[]> {
    return await this.prismaClient.doBefore.findMany({
      where: {
        AND: [
          {
            endDate: {
              gt: after,
            },
          },
          {
            endDate: {
              lte: before,
            },
          },
        ],
      },
      include: {
        user: true,
      },
    })
  }

  public async updateDoBefore(
    id: string,
    description?: string,
    endDate?: Date
  ): Promise<DoBefore> {
    const doBefore = await this.prismaClient.doBefore.findFirstOrThrow({
      where: {
        id,
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
    return await this.prismaClient.doBefore.delete({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })
  }
}
