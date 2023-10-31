/* eslint-disable @typescript-eslint/no-explicit-any */

export class ResourceRouterRequestValidator {
  // public static validateCreateResourceRequest(
  //   req: any
  // ): Result<CreateResourceRequestBody, SError> {
  //   const action: string = req?.body?.action ?? ''
  //   if (!action) {
  //     return Err(
  //       new SError(
  //         { name: ErrorName.InvalidParam },
  //         "Invalid value for 'action'",
  //         { action }
  //       )
  //     )
  //   }
  //   let args: CreateResourceInputParams
  //   try {
  //     args = req?.body?.args as CreateResourceInputParams
  //   } catch (err) {
  //     return Err(
  //       new SError(
  //         { name: ErrorName.InvalidParam },
  //         "Invalid value for 'args'",
  //         { action }
  //       )
  //     )
  //   }
  //   return Ok({ action, args })
  // }
}

// export class RouterArgsValidator {
//   public static parseUserRequest(req: any): Result<UserRequestParams, SError> {
//     const action: string = req?.body?.action ?? ''
//     if (!action) {
//       return Err(
//         new SError(
//           { name: ErrorName.InvalidParam },
//           "Invalid value for 'action'",
//           { action }
//         )
//       )
//     }

//     const args = req?.body?.args ?? null
//     if (!args) {
//       return Err(
//         new SError(
//           { name: ErrorName.InvalidParam },
//           "Invalid value for 'args'",
//           { args }
//         )
//       )
//     }

//     return Ok({ action, args })
//   }

//   public static parseGetUserArgs(args: any): Result<GetUserArgs, SError> {
//     if (!args.id) {
//       return Err(
//         new SError({ name: ErrorName.InvalidParam }, "Invalid value for 'id'", {
//           id: args.id,
//         })
//       )
//     }

//     return Ok({ id: args.id })
//   }
// }
