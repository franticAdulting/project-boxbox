import { PrismaClient, area } from '@prisma/client'
import { Ok, Result } from 'ts-results'
import { SError } from 'verror'

export type Area = area

// This repository is only accessible through LocationRepository.
export class AreaRepository {
  private readonly prismaClient: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async createArea(
    name: string,
    label: string,
    zoneName: string
  ): Promise<Result<Area, SError>> {
    const result = await this.prismaClient.area.create({
      data: {
        name,
        label,
        zone: {
          connect: {
            name: zoneName,
          },
        },
      },
    })

    return Ok(result)
  }

  public async getAreaByName(
    name: string
  ): Promise<Result<Area | null, SError>> {
    const result = await this.prismaClient.area.findFirst({
      where: {
        name,
      },
    })

    return Ok(result)
  }

  public async deleteAreaByName(name: string): Promise<Result<Area, SError>> {
    const result = await this.prismaClient.area.delete({
      where: {
        name,
      },
    })

    return Ok(result)
  }
}
