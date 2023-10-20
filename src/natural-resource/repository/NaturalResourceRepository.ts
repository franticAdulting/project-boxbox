import { NaturalResource, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { Ok, Result } from 'ts-results'
import { SError } from 'verror'
import TYPES from '../../dependency-injection/types'
import { DatabaseClient } from '../../global'
import { ResourceLocationInput } from '../types'

// const logger = getLogger()

@injectable()
export class NaturalResourceRepository {
  private readonly prismaClient: PrismaClient

  constructor(@inject(TYPES.DatabaseClient) databaseClient: DatabaseClient) {
    this.prismaClient = databaseClient.getPrismaClient()
  }

  public async CreateNaturalResourceWithNewLocations(
    name: string,
    itemLevel: number,
    gatherClass: string,
    isHidden: boolean,
    locationInputs: ResourceLocationInput[]
    // context: JobContext
  ): Promise<Result<string, SError>> {
    const result = await this.prismaClient.naturalResource.create({
      data: {
        name,
        itemLevel,
        gatherClass: gatherClass.toString(),
        isHidden,
        locations: {
          create: locationInputs,
        },
      },
    })

    return Ok(result.id)
  }

  public async CreateNaturalResourceWithExistingLocations(
    name: string,
    itemLevel: number,
    gatherClass: string,
    isHidden: boolean,
    locationIds: { id: string }[]
    // context: JobContext
  ): Promise<Result<NaturalResource, SError>> {
    const result: NaturalResource =
      await this.prismaClient.naturalResource.create({
        data: {
          name,
          itemLevel,
          gatherClass,
          isHidden,
          locations: {
            connect: locationIds,
          },
        },
        include: {
          locations: true,
        },
      })

    return Ok(result)
  }

  public async GetNaturalResourceByName(
    name: string
  ): Promise<Result<NaturalResource | null, SError>> {
    const result: NaturalResource | null =
      await this.prismaClient.naturalResource.findFirst({
        where: {
          name,
        },
      })

    return Ok(result)
  }

  public async DeleteNaturalResourceByName(
    name: string
  ): Promise<Result<boolean, SError>> {
    const result = await this.prismaClient.naturalResource.delete({
      where: {
        name,
      },
    })

    return Ok(true)
  }

  // public async createDoBefore(
  //   params: CreateDoBeforeParams,
  //   context: JobContext
  // ): Promise<Result<DoBefore, SError>> {
  //   const { description, endDate, userId } = params

  //   let doBefore: DoBefore

  //   try {
  //     doBefore = await this.prismaClient.doBefore.create({
  //       data: {
  //         description,
  //         endDate,
  //         user: {
  //           connect: {
  //             id: userId,
  //           },
  //         },
  //       },
  //       include: {
  //         user: true,
  //       },
  //     })
  //   } catch (error) {
  //     const err: Err<SError> = this.handleError(
  //       error as Error,
  //       ErrorName.FailedQuery,
  //       context,
  //       description,
  //       endDate,
  //       userId
  //     )

  //     return err
  //   }

  //   return Ok(doBefore)
  // }

  // public async getDoBeforeById(
  //   params: GetDoBeforeByIdParams,
  //   context: JobContext
  // ): Promise<Result<DoBefore, SError>> {
  //   const { id } = params

  //   let doBefore: DoBefore
  //   try {
  //     doBefore = await this.prismaClient.doBefore.findFirstOrThrow({
  //       where: {
  //         id,
  //       },
  //       include: {
  //         user: true,
  //       },
  //     })
  //   } catch (error) {
  //     const err: Err<SError> = this.handleError(
  //       error as Error,
  //       ErrorName.FailedQuery,
  //       context,
  //       id
  //     )

  //     return err
  //   }

  //   return Ok(doBefore)
  // }

  // public async fetchDoBeforeByUserId(
  //   params: FetchDoBeforeByUserIdParams,
  //   context: JobContext
  // ): Promise<Result<DoBefore[], SError>> {
  //   const { userId } = params

  //   let doBefores: DoBefore[]

  //   try {
  //     doBefores = await this.prismaClient.doBefore.findMany({
  //       where: {
  //         userId,
  //       },
  //       include: {
  //         user: true,
  //       },
  //     })
  //   } catch (error) {
  //     const err: Err<SError> = this.handleError(
  //       error as Error,
  //       ErrorName.FailedQuery,
  //       context,
  //       userId
  //     )

  //     return err
  //   }

  //   return Ok(doBefores)
  // }

  // // Fetches all DoBefores that end after the given date (exclusive).
  // public async fetchDoBeforeAfter(
  //   params: FetchDoBeforeAfterParams,
  //   context: JobContext
  // ): Promise<Result<DoBefore[], SError>> {
  //   const { after } = params

  //   let doBefores: DoBefore[]

  //   try {
  //     doBefores = await this.prismaClient.doBefore.findMany({
  //       where: {
  //         endDate: {
  //           gt: after,
  //         },
  //       },
  //       include: {
  //         user: true,
  //       },
  //     })
  //   } catch (error) {
  //     const err: Err<SError> = this.handleError(
  //       error as Error,
  //       ErrorName.FailedQuery,
  //       context,
  //       after
  //     )

  //     return err
  //   }

  //   return Ok(doBefores)
  // }

  // // Fetches all DoBefores that end before the given date (inclusive).
  // public async fetchDoBeforeBefore(
  //   params: FetchDoBeforeBeforeParams,
  //   context: JobContext
  // ): Promise<Result<DoBefore[], SError>> {
  //   const { before } = params

  //   let doBefores: DoBefore[]

  //   try {
  //     doBefores = await this.prismaClient.doBefore.findMany({
  //       where: {
  //         endDate: {
  //           lte: before,
  //         },
  //       },
  //       include: {
  //         user: true,
  //       },
  //     })
  //   } catch (error) {
  //     const err: Err<SError> = this.handleError(
  //       error as Error,
  //       ErrorName.FailedQuery,
  //       context,
  //       before
  //     )

  //     return err
  //   }

  //   return Ok(doBefores)
  // }

  // // Fetches all DoBefores that end after a given date (exclusive) and before a given date (inclusive).
  // public async fetchDoBeforeBetween(
  //   params: FetchDoBeforeBetweenParams,
  //   context: JobContext
  // ): Promise<Result<DoBefore[], SError>> {
  //   const { after, before } = params

  //   let doBefores: DoBefore[]

  //   try {
  //     doBefores = await this.prismaClient.doBefore.findMany({
  //       where: {
  //         AND: [
  //           {
  //             endDate: {
  //               gt: after,
  //             },
  //           },
  //           {
  //             endDate: {
  //               lte: before,
  //             },
  //           },
  //         ],
  //       },
  //       include: {
  //         user: true,
  //       },
  //     })
  //   } catch (error) {
  //     const err: Err<SError> = this.handleError(
  //       error as Error,
  //       ErrorName.FailedQuery,
  //       context,
  //       before
  //     )

  //     return err
  //   }

  //   return Ok(doBefores)
  // }

  // public async updateDoBefore(
  //   params: UpdateDoBeforeParams,
  //   context: JobContext
  // ): Promise<Result<DoBefore, SError>> {
  //   const { id, description, endDate } = params

  //   let doBefore: DoBefore

  //   try {
  //     const existingDoBefore =
  //       await this.prismaClient.doBefore.findFirstOrThrow({
  //         where: {
  //           id,
  //         },
  //       })

  //     doBefore = await this.prismaClient.doBefore.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         description: description ?? existingDoBefore.description,
  //         endDate: endDate ?? existingDoBefore.endDate,
  //       },
  //       include: {
  //         user: true,
  //       },
  //     })
  //   } catch (error) {
  //     const err: Err<SError> = this.handleError(
  //       error as Error,
  //       ErrorName.FailedQuery,
  //       context,
  //       id,
  //       description,
  //       endDate
  //     )

  //     return err
  //   }

  //   return Ok(doBefore)
  // }

  // public async deleteDoBefore(
  //   params: DeleteDoBeforeParams,
  //   context: JobContext
  // ): Promise<Result<DoBefore, SError>> {
  //   const { id } = params

  //   let doBefore: DoBefore

  //   try {
  //     doBefore = await this.prismaClient.doBefore.delete({
  //       where: {
  //         id,
  //       },
  //       include: {
  //         user: true,
  //       },
  //     })
  //   } catch (error) {
  //     const err: Err<SError> = this.handleError(
  //       error as Error,
  //       ErrorName.FailedQuery,
  //       context,
  //       id
  //     )

  //     return err
  //   }

  //   return Ok(doBefore)
  // }

  // private handleError(
  //   error: Error,
  //   name: ErrorName,
  //   context: JobContext,
  //   ...params: any[]
  // ): Err<SError> {
  //   logger.error({
  //     traceId: context.traceId,
  //     name,
  //     params: { params },
  //     error,
  //   })

  //   return Err(
  //     new SError(
  //       { name: ErrorName.FailedQuery, cause: error },
  //       'Query failed to find User'
  //     )
  //   )
  // }
}
