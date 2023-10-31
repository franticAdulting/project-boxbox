import { inject, injectable } from 'inversify'
import { Err, Ok, Result } from 'ts-results'
import { SError } from 'verror'
import TYPES from '../../../dependency-injection/types'
import { ResourceService } from '../../resource'
import { Recipe, RecipeRepository } from '../repository/RecipeRepository'

export interface MaterialChain {
  name: string
  total: number
  amount: number
  yield: number
  children: MaterialChain[]
}

export interface Material {
  name: string
  amount: number
  recipe: RecipeTree | null
}

export interface RecipeTree {
  name: string
  label: string
  itemLevel: number
  crafterClass: string
  yields: number
  materials: Material[]
}

@injectable()
export class RecipeService {
  private readonly recipeRepository: RecipeRepository
  private readonly resourceService: ResourceService

  constructor(
    @inject(TYPES.RecipeRepository) recipeRepository: RecipeRepository,
    @inject(TYPES.ResourceService) resourceService: ResourceService
  ) {
    this.recipeRepository = recipeRepository
    this.resourceService = resourceService
  }

  public async getRecipe(name: string): Promise<Result<Recipe, SError>> {
    const results = await this.recipeRepository.getRecipeByName(name)

    if (results.ok) {
      return Ok(results.val)
    } else {
      return Err(new SError('Invalid'))
    }
  }

  public async generateRecipeTree(recipe: Recipe): Promise<RecipeTree> {
    const { name, label, itemLevel, crafterClass, yields, materials } = recipe
    const recipeTree: RecipeTree = { name, label, itemLevel, crafterClass, yields, materials: [] }

    for (const material of materials) {
      const { name, amount } = material

      if (material.type == 'found') {
        recipeTree.materials.push({
          name: material.name,
          amount: material.amount,
          recipe: null,
        })
      } else {
        const result = await this.getRecipe(material.name)
        if (result.ok && result.val != null) {
          const childRecipeTree = await this.generateRecipeTree(result.val)

          recipeTree.materials.push({
            name,
            amount,
            recipe: childRecipeTree,
          })
        }
      }
    }

    return recipeTree
  }

  public async convertToResources(
    recipe: Recipe,
    amountNeeded: number,
    totalMaterials: Material[]
  ): Promise<Material[]> {
    const { yields, materials } = recipe

    for (const material of materials) {
      if (material.type == 'found') {
        totalMaterials.push({
          name: material.name,
          amount: Math.ceil(amountNeeded / yields) * material.amount,
          recipe: null,
        })
      } else {
        const result = await this.getRecipe(material.name)
        if (result.ok && result.val != null) {
          const newRecipe = result.val

          await this.convertToResources(newRecipe, material.amount, totalMaterials)
        }
      }
    }

    return totalMaterials
  }
}
