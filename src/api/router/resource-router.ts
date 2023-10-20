import * as express from 'express'
import { appConfig } from '../../config'
import { container } from '../../dependency-injection'
import TYPES from '../../dependency-injection/types'
import { NaturalResourceService } from '../../natural-resource'
import { ResourceRouterRequestValidator } from './ResourceRouterRequestValidator'

const resourceRouter = express.Router()
const resourceService = container.get<NaturalResourceService>(
  TYPES.NaturalResourceService
)

// Middleware for argument validation.
resourceRouter.use((req, res, next) => {
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

if (appConfig.env == 'production') {
} else {
  resourceRouter.post('/', express.json(), async (req, res, next) => {
    const traceId: string = req.body.traceId
    const requestParamValidationResults =
      ResourceRouterRequestValidator.validateCreateResourceRequest(req)

    let result: any

    if (requestParamValidationResults.ok) {
      switch (requestParamValidationResults.val.action) {
        case 'create': {
          result = await resourceService.CreateNaturalResource(
            requestParamValidationResults.val.args
          )
          break
        }
        case 'delete': {
          result = await resourceService.DeleteNaturalResourceByName(
            req.body.args.name
          )
          break
        }
        default:
          break
      }

      res.send(result)
    } else {
      res.send('error')
    }
  })
}

export default resourceRouter
