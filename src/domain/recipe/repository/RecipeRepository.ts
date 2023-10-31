import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { Ok, Result } from 'ts-results'
import { SError } from 'verror'
import TYPES from '../../../dependency-injection/types'
import { DatabaseClient } from '../../global'

export interface Recipe {
  id: string
  name: string
  label: string
  itemLevel: number
  crafterClass: string
  yields: number
  materials: { id: string; name: string; type: string; amount: number }[]
}

@injectable()
export class RecipeRepository {
  private readonly prismaClient: PrismaClient

  constructor(@inject(TYPES.DatabaseClient) databaseClient: DatabaseClient) {
    this.prismaClient = databaseClient.getPrismaClient()
  }

  public async getRecipeByName(name: string): Promise<Result<Recipe, SError>> {
    const recipe = await this.prismaClient.recipe.findFirst({
      where: { name },
      include: {
        materials: true,
      },
    })

    if (recipe != null) {
      return Ok({
        id: recipe.id,
        name: recipe.name,
        label: recipe.label,
        itemLevel: recipe.item_level,
        crafterClass: recipe.crafter_class,
        yields: recipe.yields,
        materials: recipe.materials,
      })
    } else {
      throw new SError('Item invalid.')
    }
  }
}
