import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { DatabaseClient } from '../DatabaseClient'
import { User } from './UserRepository'

export interface DoTodayAt {
  id: string
  description: string
  startDate: Date
  user: User
}

@injectable()
export class DoTodayRepository {
  private readonly prismaClient: PrismaClient

  constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
    this.prismaClient = databaseClient.getPrismaClient()
  }

  public async createDoTodayAt(
    userId: string,
    description: string,
    startDate: Date
  ): Promise<DoTodayAt> {
    const doTodayAt = await this.prismaClient.doTodayAt.create({
      data: {
        description,
        startDate,
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

    return doTodayAt
  }

  public async getDoTodayAtById(id: string): Promise<DoTodayAt> {
    const doTodayAt = await this.prismaClient.doTodayAt.findFirstOrThrow({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        user: true,
      },
    })

    return doTodayAt
  }

  public async updateDoTodayAt(
    id: string,
    description?: string,
    startDate?: Date
  ): Promise<DoTodayAt> {
    const doTodayAt = await this.prismaClient.doTodayAt.findFirstOrThrow({
      where: {
        id,
        isDeleted: false,
      },
    })

    return await this.prismaClient.doTodayAt.update({
      where: {
        id,
      },
      data: {
        description: description ?? doTodayAt.description,
        startDate: startDate ?? doTodayAt.startDate,
      },
      include: {
        user: true,
      },
    })
  }

  public async deleteDoTodayAt(id: string): Promise<DoTodayAt> {
    await this.prismaClient.doTodayAt.findFirstOrThrow({
      where: {
        id,
        isDeleted: false,
      },
    })

    return await this.prismaClient.doTodayAt.update({
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
