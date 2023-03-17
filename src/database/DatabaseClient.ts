import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'

const prisma = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }],
  errorFormat: 'pretty',
})

prisma.$on('query', (e) => {
  console.log(e)
})

// Really meant to be a single source of PrismaClient
@injectable()
export class DatabaseClient {
  private prismaClientSingleton: PrismaClient

  constructor() {
    this.prismaClientSingleton = prisma
  }

  public getPrismaClient(): PrismaClient {
    return this.prismaClientSingleton
  }
}
