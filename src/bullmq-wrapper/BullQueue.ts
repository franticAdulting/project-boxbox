import { Job, JobsOptions, Queue, QueueOptions } from 'bullmq'
import { v4 } from 'uuid'

const queueOptions: QueueOptions = {
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'fixed',
      delay: 5000,
    },
  },
  connection: {
    host: 'redis',
    port: 6379,
  },
}

export abstract class BullQueue<DataType, ReturnType, NameType extends string> {
  private readonly queue: Queue<DataType, ReturnType, NameType>

  constructor(queueName: string) {
    this.queue = new Queue<DataType, ReturnType, NameType>(
      queueName,
      queueOptions
    )
  }

  public addJob(
    name: NameType,
    data: DataType,
    jobsOptions?: JobsOptions
  ): Promise<Job<DataType, ReturnType, NameType>> {
    const jobId = v4()
    const opts = jobsOptions ? { ...jobsOptions, jobId } : { jobId }

    return this.queue.add(name, data, opts)
  }
}
