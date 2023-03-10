import { PrismaClient } from '@prisma/client'

// export class DatabaseClient {
//   private static instance: PrismaClient

//   public static getInstance(): PrismaClient {
//     if (!this.instance) {
//       const logDefinitions: Prisma.LogDefinition[] = [
//         { level: 'query', emit: 'event' },
//       ]

//       const prismaClient = new PrismaClient({
//         log: logDefinitions,
//         errorFormat: 'pretty',
//       })

//       prismaClient.$on('query', (e) => {})
//     }

//     return this.instance
//   }

//   public static initPrismaClient() {
//     this.instance.$on('query', (e) => {
//       console.log(e)
//     })
//   }
// }

const prisma = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }],
  errorFormat: 'pretty',
})

prisma.$on('query', (e) => {
  console.log(e)
})

let prismaSingleton: PrismaClient

const getSingleton = (): PrismaClient => {
  if (!prismaSingleton) {
    prismaSingleton = prisma
  }

  return prismaSingleton
}

export const prismaClient = getSingleton()
