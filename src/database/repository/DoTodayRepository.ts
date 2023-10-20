// import { PrismaClient } from '@prisma/client'
// import { inject, injectable } from 'inversify'
// import { DatabaseClient } from '../DatabaseClient'
// import { DoToday } from '../types'

// @injectable()
// export class DoTodayRepository {
//   private readonly prismaClient: PrismaClient

//   constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
//     this.prismaClient = databaseClient.getPrismaClient()
//   }

//   public async createDoToday(
//     userId: string,
//     description: string,
//     startDate: Date
//   ): Promise<DoToday> {
//     const doToday = await this.prismaClient.doToday.create({
//       data: {
//         description,
//         startDate,
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

//     return doToday
//   }

//   public async getDoTodayById(id: string): Promise<DoToday> {
//     const doToday = await this.prismaClient.doToday.findFirstOrThrow({
//       where: {
//         id,
//       },
//       include: {
//         user: true,
//       },
//     })

//     return doToday
//   }

//   public async updateDoToday(
//     id: string,
//     description?: string,
//     startDate?: Date
//   ): Promise<DoToday> {
//     const doToday = await this.prismaClient.doToday.findFirstOrThrow({
//       where: {
//         id,
//       },
//     })

//     return await this.prismaClient.doToday.update({
//       where: {
//         id,
//       },
//       data: {
//         description: description ?? doToday.description,
//         startDate: startDate ?? doToday.startDate,
//       },
//       include: {
//         user: true,
//       },
//     })
//   }

//   public async deleteDoToday(id: string): Promise<DoToday> {
//     return await this.prismaClient.doToday.delete({
//       where: {
//         id,
//       },
//       include: {
//         user: true,
//       },
//     })
//   }
// }
