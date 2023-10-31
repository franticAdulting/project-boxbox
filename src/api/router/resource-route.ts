import * as express from 'express'

const resourceRouter = express.Router()
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

// if (appConfig.env == 'production') {
// } else {
//   resourceRouter.post('/', express.json(), async (req, res, next) => {})
// }

export default resourceRouter
