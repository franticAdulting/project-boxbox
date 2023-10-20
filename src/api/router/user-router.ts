// import * as express from 'express'
// import { v4 } from 'uuid'
// import { appConfig } from '../../config'
// import { container } from '../../dependency-injection'
// import TYPES from '../../dependency-injection/types'
// import { UserService } from '../../domain/user/UserService'
// import {
//   CreateUserArgs,
//   DeleteUserArgs,
//   GetUserArgs,
//   UpdateUserArgs,
//   UserJobName,
// } from '../../user/'
// import { UserQueue } from '../../user/queue/UserQueue'
// import { RouterArgsValidator } from './RouterArgsValidator'

// const userRouter = express.Router()
// const userService = container.get<UserService>(TYPES.UserService)

// // Middleware for argument validation.
// userRouter.use((req, res, next) => {
//   const requestParamValidationResults =
//     RouterArgsValidator.parseUserRequest(req)

//   if (!req.body.traceId) {
//     req.body.traceId = v4()
//   }

//   if (requestParamValidationResults.ok) {
//     next()
//   } else {
//     next(requestParamValidationResults.val)
//   }
// })

// // Can safely assume arguments have been validated.
// userRouter.get('/', express.json(), async (req, res, next) => {
//   const traceId = req.body.traceId
//   const action = req.body.action
//   const args = req.body.args as GetUserArgs

//   let responseBody

//   switch (action) {
//     case UserJobName.GetUser: {
//       const result = await userService.getUserById({ id: args.id }, { traceId })

//       if (result.ok) {
//         responseBody = result.val
//       } else {
//         next(result.val)
//       }

//       break
//     }
//     default:
//       break
//   }

//   if (responseBody) {
//     res.send({
//       traceId: req.body.traceId,
//       isSuccess: true,
//       result: responseBody,
//     })
//   }
// })

// if (appConfig.env == 'production') {
//   userRouter.post('/', express.json(), async (req, res) => {
//     const action = req.body.action
//     const args = req.body.args

//     let job

//     switch (action) {
//       case UserJobName.CreateUser: {
//         const createUserArgs = args as CreateUserArgs
//         job = await UserQueue.getInstance().enqueueCreateUser(createUserArgs)

//         break
//       }
//       case UserJobName.UpdateUser: {
//         const updateUserArgs = args as UpdateUserArgs
//         job = await UserQueue.getInstance().enqueueUpdateUser(updateUserArgs)
//         break
//       }
//       case UserJobName.DeleteUser: {
//         const deleteUserArgs = args as DeleteUserArgs
//         job = await UserQueue.getInstance().enqueueDeleteUser(deleteUserArgs)
//         break
//       }
//       default:
//         break
//     }

//     res.send({ job })
//   })
// } else {
//   userRouter.post('/', express.json(), async (req, res, next) => {
//     const traceId: string = req.body.traceId
//     const action: UserJobName = req.body.action as UserJobName

//     let responseBody

//     switch (action) {
//       case UserJobName.CreateUser: {
//         const args = req.body.args as CreateUserArgs
//         const { email } = args

//         const result = await userService.createUser({ email }, { traceId })

//         if (result.ok) {
//           responseBody = result.val
//         } else {
//           next(result.val)
//         }

//         break
//       }
//       case UserJobName.UpdateUser: {
//         const args = req.body.args as UpdateUserArgs
//         const { id, email } = args

//         const result = await userService.updateUser({ id, email }, { traceId })

//         if (result.ok) {
//           responseBody = result.val
//         } else {
//           next(result.val)
//         }

//         break
//       }
//       case UserJobName.DeleteUser: {
//         const args = req.body.args as DeleteUserArgs
//         const { id } = args

//         const result = await userService.deleteUser({ id }, { traceId })

//         if (result.ok) {
//           responseBody = result.val
//         } else {
//           next(result.val)
//         }

//         break
//       }
//       default:
//         break
//     }

//     if (responseBody) {
//       res.send({
//         traceId: req.body.traceId,
//         isSuccess: true,
//         result: responseBody,
//       })
//     }
//   })
// }

// export default userRouter
