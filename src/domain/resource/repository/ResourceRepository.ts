import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { Ok, Result } from 'ts-results'
import { SError } from 'verror'
import TYPES from '../../../dependency-injection/types'
import { DatabaseClient } from '../../global'
import { Location } from '../../location'
import { Resource } from '../types'

@injectable()
export class ResourceRepository {
  private readonly prismaClient: PrismaClient

  constructor(@inject(TYPES.DatabaseClient) databaseClient: DatabaseClient) {
    this.prismaClient = databaseClient.getPrismaClient()
  }

  public async getResourceByName(name: string): Promise<Result<Resource | null, SError>> {
    const resource = await this.prismaClient.resource.findFirst({
      where: {
        name,
      },
      include: {
        resource_locations: {
          include: {
            location: true,
          },
        },
      },
    })

    if (resource != null) {
      const { id, name, label, item_level: itemLevel, gather_class: gatherClass, is_hidden: isHidden } = resource
      const locations: Location[] = resource.resource_locations.map((rl) => {
        const { id, gather_level: gatherLevel, region_name: region, zone_name: zone, area_name: area } = rl.location
        return {
          id,
          gatherLevel,
          region,
          zone,
          area,
        }
      })

      return Ok({
        id,
        name,
        label,
        itemLevel,
        gatherClass,
        isHidden,
        locations,
      })
    } else {
      return Ok(null)
    }
  }
}
