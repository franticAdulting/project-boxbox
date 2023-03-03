import { Job } from 'bullmq'
import { BullQueue } from '../../bullmq-wrapper/BullQueue'
import {
  CreateUserArgs,
  DeleteUserArgs,
  UpdateUserArgs,
  UserJobData,
  UserJobName,
  UserJobQueueReturn,
} from './user-job-types'

export class UserQueue extends BullQueue<
  UserJobData,
  UserJobQueueReturn,
  UserJobName
> {
  private static instance: UserQueue

  constructor() {
    super('user')
  }

  public static getInstance(): UserQueue {
    if (!this.instance) {
      this.instance = new UserQueue()
    }

    return this.instance
  }

  public async enqueueCreateUser(
    data: CreateUserArgs
  ): Promise<UserJobQueueReturn> {
    const job: Job<UserJobData, UserJobQueueReturn, UserJobName> =
      await this.addJob(UserJobName.CreateUser, data)

    return {
      name: job.name,
      id: job.id ?? '',
      isCompleted: await job.isCompleted(),
    }
  }

  public async enqueueUpdateUser(
    data: UpdateUserArgs
  ): Promise<UserJobQueueReturn> {
    const job: Job<UserJobData, UserJobQueueReturn, UserJobName> =
      await this.addJob(UserJobName.UpdateUser, data)

    return {
      name: job.name,
      id: job.id ?? '',
      isCompleted: await job.isCompleted(),
    }
  }

  public async enqueueDeleteUser(
    data: DeleteUserArgs
  ): Promise<UserJobQueueReturn> {
    const job: Job<UserJobData, UserJobQueueReturn, UserJobName> =
      await this.addJob(UserJobName.DeleteUser, data)

    return {
      name: job.name,
      id: job.id ?? '',
      isCompleted: await job.isCompleted(),
    }
  }
}
