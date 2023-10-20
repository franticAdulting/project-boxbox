import { NaturalResource } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { Err, Ok, Result } from 'ts-results'
import { SError } from 'verror'
import TYPES from '../../dependency-injection/types'
import { ResourceLocationRepository } from '../../resource-location'
import { NaturalResourceRepository } from '../repository'
import { CreateResourceInputParams } from '../types'

@injectable()
export class NaturalResourceService {
  private readonly naturalResourceRepository: NaturalResourceRepository
  private readonly resourceLocationRepository: ResourceLocationRepository

  public constructor(
    @inject(TYPES.NaturalResourceRepository)
    naturalResourceRepository: NaturalResourceRepository,
    @inject(TYPES.ResourceLocationRepository)
    resourceLocationRepository: ResourceLocationRepository
  ) {
    this.naturalResourceRepository = naturalResourceRepository
    this.resourceLocationRepository = resourceLocationRepository
  }

  public async CreateNaturalResource(
    input: CreateResourceInputParams
  ): Promise<Result<NaturalResource, SError>> {
    const {
      name,
      itemLevel,
      gatherClass,
      isHidden,
      locationInputs: locationDatas,
    } = input

    // Check that an entry doesn't already exist
    const alreadyExists = await this.DoesNaturalResourceAlreadyExist(name)
    if (alreadyExists.val) {
      throw new SError()
    }

    const existingLocationIds: string[] = []

    await Promise.all(
      locationDatas.map(async (location) => {
        const { region, zone, area, gatherLevel } = location
        const result =
          await this.resourceLocationRepository.getResourceLocationId(
            region,
            zone,
            area,
            gatherLevel
          )

        if (result.ok) {
          if (result.val) {
            existingLocationIds.push(result.val)
          } else {
            const newResourceLocation =
              await this.resourceLocationRepository.createResourceLocation(
                region,
                zone,
                area,
                gatherLevel
              )
            if (newResourceLocation.ok) {
              existingLocationIds.push(newResourceLocation.val.id)
            }
          }
        }
      })
    )

    const result =
      await this.naturalResourceRepository.CreateNaturalResourceWithExistingLocations(
        name,
        itemLevel,
        gatherClass,
        isHidden,
        existingLocationIds.map((locationId) => {
          return { id: locationId }
        })
      )

    if (result.ok) {
      return Ok(result.val)
    }

    return Err(result.val)
  }

  public async DeleteNaturalResourceByName(
    name: string
  ): Promise<Result<boolean, SError>> {
    const result =
      await this.naturalResourceRepository.DeleteNaturalResourceByName(name)

    return Ok(true)
  }

  private async DoesNaturalResourceAlreadyExist(
    name: string
  ): Promise<Result<boolean, SError>> {
    const result =
      await this.naturalResourceRepository.GetNaturalResourceByName(name)

    return Ok(result.val != null)
  }
}
