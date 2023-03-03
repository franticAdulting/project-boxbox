import { Job } from 'bullmq'
import { BullWorker } from '../../bullmq-wrapper/BullWorker'
import { UserJobData, UserJobName, UserJobWorkerReturn } from './user-job-types'

export class UserWorker extends BullWorker<
  UserJobData,
  UserJobWorkerReturn,
  UserJobName
> {
  constructor() {
    super('user')
  }

  async process(
    job: Job<UserJobData, UserJobWorkerReturn, UserJobName>
  ): Promise<UserJobWorkerReturn> {
    console.log(`name: ${job.name}`)
    console.log(`jobData: ${job.data}`)

    return { id: job.id ?? '' }
  }

  async onComplete(
    job: Job<UserJobData, UserJobWorkerReturn, UserJobName>,
    result: any
  ): Promise<void> {
    console.log(`onComplete: ${job.data}`)
  }

  async onFailed(
    job: Job<UserJobData, UserJobWorkerReturn, UserJobName> | undefined,
    error: Error
  ): Promise<void> {
    console.log(`onFailed: ${error}`)
  }
}
