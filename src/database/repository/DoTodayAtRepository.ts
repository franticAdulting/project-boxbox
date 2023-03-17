import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { DatabaseClient } from '../DatabaseClient'
import { DoTodayAt } from '../types'

@injectable()
export class DoTodayAtRepository {
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
    return await this.prismaClient.doTodayAt.delete({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })
  }
}
