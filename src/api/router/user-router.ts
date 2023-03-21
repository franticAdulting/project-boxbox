import * as express from 'express'
import { appConfig } from '../../config/appConfig'
import { container } from '../../dependency-injection'
import TYPES from '../../dependency-injection/types'
import { UserService } from '../../domain/user/UserService'
import { getLogger } from '../../logger/winston'
import {
  CreateUserArgs,
  DeleteUserArgs,
  UpdateUserArgs,
  UserJobName,
} from '../../user/queue/user-job-types'
import { UserQueue } from '../../user/queue/UserQueue'
import { RouterArgsValidator } from './RouterArgsValidator'

const logger = getLogger()

const userRouter = express.Router()
const userService = container.get<UserService>(TYPES.UserService)

userRouter.use((req, res, next) => {
  const requestParamValidationResults =
    RouterArgsValidator.parseUserRequest(req)

  if (requestParamValidationResults.ok) {
    next()
  } else {
    next(requestParamValidationResults.val)
  }
})

userRouter.get('/', express.json(), async (req, res, next) => {
  const action = req.body.action
  const args = req.body.args

  switch (action) {
    case UserJobName.GetUser: {
      const getUserArgs = RouterArgsValidator.parseGetUserArgs(args)

      if (getUserArgs.ok) {
        const user = await userService.getUserById(getUserArgs.val.id)
        res.send({ user })
      } else {
        next(getUserArgs.val)
      }

      break
    }
    default:
      break
  }

  // res.send({ yes: 'yes' })
})

if (appConfig.env == 'production') {
  userRouter.post('/', express.json(), async (req, res) => {
    const action = req.body.action
    const args = req.body.args

    let job

    switch (action) {
      case UserJobName.CreateUser: {
        const createUserArgs = args as CreateUserArgs
        job = await UserQueue.getInstance().enqueueCreateUser(createUserArgs)

        break
      }
      case UserJobName.UpdateUser: {
        const updateUserArgs = args as UpdateUserArgs
        job = await UserQueue.getInstance().enqueueUpdateUser(updateUserArgs)
        break
      }
      case UserJobName.DeleteUser: {
        const deleteUserArgs = args as DeleteUserArgs
        job = await UserQueue.getInstance().enqueueDeleteUser(deleteUserArgs)
        break
      }
      default:
        break
    }

    res.send({ job })
  })
} else {
  userRouter.post('/', express.json(), async (req, res) => {
    const action = req.body.action
    const args = req.body.args

    let job

    switch (action) {
      case UserJobName.CreateUser: {
        const createUserArgs = args as CreateUserArgs
        const user = userService.createUser(createUserArgs.email)
        res.send({ user })
        break
      }
      case UserJobName.UpdateUser: {
        const updateUserArgs = args as UpdateUserArgs
        break
      }
      case UserJobName.DeleteUser: {
        const deleteUserArgs = args as DeleteUserArgs
        break
      }
      default:
        break
    }

    // res.send({ job })
  })
}

export default userRouter
