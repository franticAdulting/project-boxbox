// import { PrismaClient } from '@prisma/client'
// import { inject, injectable } from 'inversify'
// import { Err, Ok, Result } from 'ts-results'
// import { SError } from 'verror'
// import TYPES from '../../dependency-injection/types'
// import { ErrorName } from '../../error'
// import { JobContext } from '../../global'
// import { getLogger } from '../../logger'
// import { DatabaseClient } from '../DatabaseClient'
// import {
//   CreateUserParams,
//   DeleteUserParams,
//   GetUserByIdParams,
//   UpdateUserParams,
//   User,
// } from '../types'

// const logger = getLogger()

// @injectable()
// export class UserRepository {
//   private readonly prismaClient: PrismaClient

//   constructor(@inject(TYPES.DatabaseClient) databaseClient: DatabaseClient) {
//     this.prismaClient = databaseClient.getPrismaClient()
//   }

//   public async createUser(
//     params: CreateUserParams,
//     context: JobContext
//   ): Promise<Result<User, SError>> {
//     const { email } = params
//     let user: User

//     try {
//       user = await this.prismaClient.user.create({
//         data: {
//           email,
//         },
//       })
//     } catch (error) {
//       const err: Err<SError> = this.handleError(
//         error as Error,
//         ErrorName.FailedQuery,
//         context,
//         email
//       )

//       return err
//     }

//     return Ok(user)
//   }

//   public async getUserById(
//     params: GetUserByIdParams,
//     context: JobContext
//   ): Promise<Result<User, SError>> {
//     const { id } = params
//     let user: User

//     try {
//       user = await this.prismaClient.user.findFirstOrThrow({
//         where: {
//           id,
//         },
//       })
//     } catch (error) {
//       const err: Err<SError> = this.handleError(
//         error as Error,
//         ErrorName.FailedQuery,
//         context,
//         id
//       )

//       return err
//     }

//     return Ok(user)
//   }

//   public async updateUser(
//     params: UpdateUserParams,
//     context: JobContext
//   ): Promise<Result<User, SError>> {
//     const { id, email } = params
//     let user: User

//     try {
//       await this.prismaClient.user.findFirstOrThrow({
//         where: {
//           id,
//         },
//       })

//       user = await this.prismaClient.user.update({
//         where: {
//           id,
//         },
//         data: {
//           email,
//         },
//       })
//     } catch (error) {
//       const err: Err<SError> = this.handleError(
//         error as Error,
//         ErrorName.FailedQuery,
//         context,
//         id,
//         email
//       )

//       return err
//     }

//     return Ok(user)
//   }

//   public async deleteUser(
//     params: DeleteUserParams,
//     context: JobContext
//   ): Promise<Result<User, SError>> {
//     const { id } = params
//     let user: User

//     try {
//       user = await this.prismaClient.user.delete({
//         where: {
//           id,
//         },
//       })
//     } catch (error) {
//       const err: Err<SError> = this.handleError(
//         error as Error,
//         ErrorName.FailedQuery,
//         context,
//         id
//       )

//       return err
//     }

//     return Ok(user)
//   }

//   private handleError(
//     error: Error,
//     name: ErrorName,
//     context: JobContext,
//     ...params: any[]
//   ): Err<SError> {
//     logger.error({
//       traceId: context.traceId,
//       name,
//       params: { params },
//       error,
//     })

//     return Err(
//       new SError(
//         { name: ErrorName.FailedQuery, cause: error },
//         'Query failed to find User'
//       )
//     )
//   }
// }
