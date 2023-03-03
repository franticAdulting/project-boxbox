// export class SandboxQueue {
//   private static instance: SandboxQueue;

//   private readonly queue: Queue;

//   constructor() {
//     this.queue = new Queue("sandbox", {
//       connection: {
//         host: "redis",
//         port: 6379,
//       },
//     });
//   }

//   public static getInstance(): SandboxQueue {
//     if (!this.instance) {
//       this.instance = new SandboxQueue();
//     }

//     return this.instance;
//   }

//   public async addJob(data: any): Promise<void> {
//     await this.queue.add("jobName", data);
//   }
// }
