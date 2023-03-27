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

export interface CreateDoBeforeParams {
  description: string
  endDate: Date
  userId: string
}

export interface GetDoBeforeByIdParams {
  id: string
}

export interface FetchDoBeforeByUserIdParams {
  userId: string
}

export interface FetchDoBeforeAfterParams {
  after: Date
}

export interface FetchDoBeforeBeforeParams {
  before: Date
}

export interface FetchDoBeforeBetweenParams {
  after: Date
  before: Date
}

export interface UpdateDoBeforeParams {
  id: string
  description?: string
  endDate?: Date
}

export interface DeleteDoBeforeParams {
  id: string
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
