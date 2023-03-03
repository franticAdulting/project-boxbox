export enum UserJobName {
  CreateUser = 'create-user',
  GetUser = 'get-user',
  UpdateUser = 'update-user',
  DeleteUser = 'delete-user',
}

export interface CreateUserArgs {
  email: string
}

export interface GetUserArgs {
  id: string
}

export interface UpdateUserArgs {
  id: string
  email?: string
}

export interface DeleteUserArgs {
  id: string
}

export type UserJobData =
  | CreateUserArgs
  | GetUserArgs
  | UpdateUserArgs
  | DeleteUserArgs

export interface UserJobQueueReturn {
  name: UserJobName
  id: string
  isCompleted: boolean
}

export interface UserJobWorkerReturn {
  id: string
}
