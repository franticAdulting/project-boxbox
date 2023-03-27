import { PrismaClient } from '@prisma/client'

export interface User {
  id: string
  email: string
}

export interface CreateUserParams {
  email: string
}

export interface GetUserByIdParams {
  id: string
}

export interface UpdateUserParams {
  id: string
  email?: string
}

export interface DeleteUserParams {
  id: string
}

export interface DoBefore {
  id: string
  description: string
  endDate: Date
  user: User
}

export interface DoToday {
  id: string
  description: string
  startDate: Date
  user: User
}

export interface DoTodayAt {
  id: string
  description: string
  startDate: Date
  user: User
}

export interface IUserRepository {
  createUser(email: string): Promise<User>
  getUserById(id: string): Promise<User>
}

export interface IDatabaseClient {
  getPrismaClient(): PrismaClient
}
