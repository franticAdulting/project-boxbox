import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { Err, Ok, Result } from 'ts-results'
import { SError } from 'verror'
import TYPES from '../../dependency-injection/types'
import { ErrorName } from '../../error'
import { getLogger } from '../../logger/winston'
import { DatabaseClient } from '../DatabaseClient'
import { User } from '../types'

const logger = getLogger()

@injectable()
export class UserRepository {
  private readonly prismaClient: PrismaClient

  constructor(@inject(TYPES.DatabaseClient) databaseClient: DatabaseClient) {
    this.prismaClient = databaseClient.getPrismaClient()
  }

  public async createUser(email: string): Promise<User> {
    const user = await this.prismaClient.user.create({
      data: {
        email,
      },
    })

    return user
  }

  public async getUserById(
    id: string,
    traceId: string
  ): Promise<Result<User, SError>> {
    let user: User

    try {
      user = await this.prismaClient.user.findFirstOrThrow({
        where: {
          id,
        },
      })
    } catch (error) {
      const typedError = error as Error
      logger.error({
        traceId,
        name: ErrorName.FailedQuery,
        params: { id },
        error,
      })

      return Err(
        new SError(
          { name: ErrorName.FailedQuery, cause: typedError },
          'Query failed to find User'
        )
      )
    }

    return Ok(user)
  }

  public async updateUser(id: string, email?: string): Promise<User> {
    await this.prismaClient.user.findFirstOrThrow({
      where: {
        id,
      },
    })

    return await this.prismaClient.user.update({
      where: {
        id,
      },
      data: {
        email,
      },
    })
  }

  public async deleteUser(id: string): Promise<User> {
    return await this.prismaClient.user.delete({
      where: {
        id,
      },
    })
  }
}
