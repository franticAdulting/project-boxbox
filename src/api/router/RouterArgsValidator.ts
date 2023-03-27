/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorName } from '@error/index'
import { Err, Ok, Result } from 'ts-results'
import { SError } from 'verror'
import { GetUserArgs } from '../../user/queue/user-job-types'

interface UserRequestParams {
  action: string
  args: any
}

export class RouterArgsValidator {
  public static parseUserRequest(req: any): Result<UserRequestParams, SError> {
    const action: string = req?.body?.action ?? ''
    if (!action) {
      return Err(
        new SError(
          { name: ErrorName.InvalidParam },
          "Invalid value for 'action'",
          { action }
        )
      )
    }

    const args = req?.body?.args ?? null
    if (!args) {
      return Err(
        new SError(
          { name: ErrorName.InvalidParam },
          "Invalid value for 'args'",
          { args }
        )
      )
    }

    return Ok({ action, args })
  }

  public static parseGetUserArgs(args: any): Result<GetUserArgs, SError> {
    if (!args.id) {
      return Err(
        new SError({ name: ErrorName.InvalidParam }, "Invalid value for 'id'", {
          id: args.id,
        })
      )
    }

    return Ok({ id: args.id })
  }
}
