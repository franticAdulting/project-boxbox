// export class SandboxWorker extends BullWorker {
//   constructor() {
//     super("sandbox");
//   }

//   async process(job: Job): Promise<void> {
//     console.log(`name: ${job.name}`);
//     console.log(`jobData: ${job.data}`);
//   }

//   async onComplete(job: Job, result: any): Promise<void> {
//     console.log(`onComplete: ${job.data}`);
//   }

//   async onFailed(job: Job | undefined, error: Error): Promise<void> {}
// }
