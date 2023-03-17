import * as express from 'express'
import { appConfig } from '../config/appConfig'
import {
  CreateUserArgs,
  DeleteUserArgs,
  GetUserArgs,
  UpdateUserArgs,
  UserJobName,
} from '../user/queue/user-job-types'
import { UserQueue } from '../user/queue/UserQueue'

const userRouter = express.Router()

userRouter.get('/', express.json(), async (req, res) => {
  const action = req.body.action
  const args = req.body.args

  switch (action) {
    case UserJobName.GetUser: {
      const getUserArgs = args as GetUserArgs
      break
    }
    default:
      break
  }

  res.send({ yes: 'yes' })
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

    res.send({ job })
  })
}

export default userRouter
