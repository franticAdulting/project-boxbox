import { Job, Worker } from 'bullmq'

export abstract class BullWorker<
  DataType,
  ReturnType,
  NameType extends string
> {
  private readonly worker: Worker<DataType, ReturnType, NameType>

  constructor(queueName: string) {
    this.worker = new Worker<DataType, ReturnType, NameType>(
      queueName,
      this.process,
      {
        connection: {
          host: 'redis',
          port: 6379,
        },
      }
    )
    this.worker.on('completed', this.onComplete)
    this.worker.on('failed', this.onFailed)

    // This will have to change eventually
    this.worker.on('error', (error: Error) => {
      console.log(error)
    })
  }

  abstract process(job: Job): Promise<ReturnType>

  abstract onComplete(job: Job, result: any): Promise<void>

  abstract onFailed(job: Job | undefined, error: Error): Promise<void>
}
