import * as express from 'express'
import { Material, RecipeService } from '..'
import { container } from '../../../dependency-injection'
import TYPES from '../../../dependency-injection/types'

const recipeRouter = express.Router()
const recipeService = container.get<RecipeService>(TYPES.RecipeService)

// Middleware for argument validation.
recipeRouter.use((req, res, next) => {
  // const requestParamValidationResults =
  // ResourceRouterRequestValidator.validateCreateResourceRequest(req)

  // if (!req.body.traceId) {
  //   req.body.traceId = v4()
  // }

  // if (requestParamValidationResults.ok) {
  //   next()
  // } else {
  //   next(requestParamValidationResults.val)
  // }
  next()
})

// Can safely assume arguments have been validated.
// resourceRouter.get('/', express.json(), async (req, res, next) => {})

recipeRouter.post('/', express.json(), async (req, res, next) => {
  const itemName = req.body.inputs.name
  const result = await recipeService.getRecipe(itemName)
  if (result.ok && result.val != null) {
    // const recipeTree = await recipeService.generateRecipeTree(result.val)
    const materials = await recipeService.convertToResources(result.val, 1, [])

    const flattenedMaterials: Material[] = []

    for (const material of materials) {
      const existingIndex = flattenedMaterials.findIndex((item) => item.name == material.name)
      if (existingIndex != -1) {
        flattenedMaterials[existingIndex].amount += material.amount
      } else {
        flattenedMaterials.push(material)
      }
    }

    res.send(flattenedMaterials)
  } else {
    res.send('hello')
  }
})

export default recipeRouter
