import { PrismaClient, region } from '@prisma/client'
import { Ok, Result } from 'ts-results'
import { SError } from 'verror'

export type Region = region

// This repository is only accessible through LocationRepository.
export class RegionRepository {
  private readonly prismaClient: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async createRegion(name: string, label: string): Promise<Result<Region, SError>> {
    const result = await this.prismaClient.region.create({
      data: {
        name,
        label,
      },
    })

    return Ok(result)
  }

  public async getRegionByName(name: string): Promise<Result<Region | null, SError>> {
    const result = await this.prismaClient.region.findFirst({
      where: {
        name,
      },
    })

    return Ok(result)
  }

  public async deleteRegionByName(name: string): Promise<Result<Region, SError>> {
    // Prisma only allows single record deletes by id or unique attribute.
    const result = await this.prismaClient.region.delete({
      where: {
        name,
      },
    })

    return Ok(result)
  }

  public async deleteAllRegions(): Promise<void> {
    await this.prismaClient.region.deleteMany({})
  }
}
