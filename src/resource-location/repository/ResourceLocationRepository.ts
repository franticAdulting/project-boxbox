import { PrismaClient, ResourceLocation } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { Ok, Result } from 'ts-results'
import { SError } from 'verror'
import TYPES from '../../dependency-injection/types'
import { DatabaseClient } from '../../global'

// const logger = getLogger()

@injectable()
export class ResourceLocationRepository {
  private readonly prismaClient: PrismaClient

  constructor(@inject(TYPES.DatabaseClient) databaseClient: DatabaseClient) {
    this.prismaClient = databaseClient.getPrismaClient()
  }

  public async getResourceLocationId(
    region: string,
    zone: string,
    area: string,
    gatherLevel: number
    // context: JobContext
  ): Promise<Result<string | null, SError>> {
    const result = await this.prismaClient.resourceLocation.findFirst({
      where: {
        region,
        zone,
        area,
        gatherLevel,
      },
    })

    return Ok(result?.id ?? null)
  }

  public async createResourceLocation(
    region: string,
    zone: string,
    area: string,
    gatherLevel: number
    // context: JobContext
  ): Promise<Result<ResourceLocation, SError>> {
    const result = await this.prismaClient.resourceLocation.create({
      data: {
        region,
        zone,
        area,
        gatherLevel,
      },
    })

    return Ok(result)
  }
}
