import { Container } from 'inversify'
import { DatabaseClient } from '../database'
import { LocationRepository, LocationService } from '../domain/location'
import {
  NaturalResourceRepository,
  NaturalResourceService,
} from '../natural-resource'
import { ResourceLocationRepository } from '../resource-location'
import TYPES from './types'

export const container = new Container()
container
  .bind<DatabaseClient>(TYPES.DatabaseClient)
  .to(DatabaseClient)
  .inSingletonScope()
container
  .bind<LocationRepository>(TYPES.LocationRepository)
  .to(LocationRepository)
  .inSingletonScope()
container
  .bind<LocationService>(TYPES.LocationService)
  .to(LocationService)
  .inSingletonScope()

container
  .bind<NaturalResourceRepository>(TYPES.NaturalResourceRepository)
  .to(NaturalResourceRepository)
  .inSingletonScope()
container
  .bind<ResourceLocationRepository>(TYPES.ResourceLocationRepository)
  .to(ResourceLocationRepository)
  .inSingletonScope()
container
  .bind<NaturalResourceService>(TYPES.NaturalResourceService)
  .to(NaturalResourceService)
  .inSingletonScope()
