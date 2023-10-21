import { PrismaClient, zone } from '@prisma/client'
import { Ok, Result } from 'ts-results'
import { SError } from 'verror'

export type Zone = zone

// This repository is only accessible through LocationRepository.
export class ZoneRepository {
  private readonly prismaClient: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async createZone(
    name: string,
    label: string,
    regionName: string
  ): Promise<Result<Zone, SError>> {
    const result = await this.prismaClient.zone.create({
      data: {
        name,
        label,
        region: {
          connect: {
            name: regionName,
          },
        },
      },
    })

    return Ok(result)
  }

  public async getZoneByName(
    name: string
  ): Promise<Result<Zone | null, SError>> {
    const result = await this.prismaClient.zone.findFirst({
      where: {
        name,
      },
    })

    return Ok(result)
  }

  public async deleteZoneByName(name: string): Promise<Result<Zone, SError>> {
    const result = await this.prismaClient.zone.delete({
      where: {
        name,
      },
    })

    return Ok(result)
  }
}
