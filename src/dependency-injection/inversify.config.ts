import { Container } from 'inversify'
import { DatabaseClient } from '../database'
import { LocationRepository, LocationService } from '../domain/location'
import { RecipeService } from '../domain/recipe'
import { RecipeRepository } from '../domain/recipe/repository/RecipeRepository'
import { ResourceRepository, ResourceService } from '../domain/resource'
import TYPES from './types'

export const container = new Container()
container.bind<DatabaseClient>(TYPES.DatabaseClient).to(DatabaseClient).inSingletonScope()
container.bind<LocationRepository>(TYPES.LocationRepository).to(LocationRepository).inSingletonScope()
container.bind<LocationService>(TYPES.LocationService).to(LocationService).inSingletonScope()
container.bind<RecipeRepository>(TYPES.RecipeRepository).to(RecipeRepository).inSingletonScope()
container.bind<RecipeService>(TYPES.RecipeService).to(RecipeService).inSingletonScope()
container.bind<ResourceRepository>(TYPES.ResourceRepository).to(ResourceRepository).inSingletonScope()
container.bind<ResourceService>(TYPES.ResourceService).to(ResourceService).inSingletonScope()
