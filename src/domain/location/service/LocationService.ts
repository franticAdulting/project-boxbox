import { inject, injectable } from 'inversify'
import TYPES from '../../../dependency-injection/types'
import { LocationRepository } from '../repository'

@injectable()
export class LocationService {
  private readonly locationRepository: LocationRepository

  constructor(
    @inject(TYPES.LocationRepository) locationRepository: LocationRepository
  ) {
    this.locationRepository = locationRepository
  }
}
