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
