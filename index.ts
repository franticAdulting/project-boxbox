// Import the express in typescript file
import cors from 'cors'
import express from 'express'
import { getLogger } from './src/logger/winston'

const logger = getLogger()

logger.error('test error')
logger.warn('test warn')
logger.info('test info')
logger.http('test http')

// Initialize the express engine
const app: express.Application = express()
app.use(express.json())

const whitelist = ['http://localhost:3000']
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (origin && whitelist.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.use(cors())

// Take a port 3000 for running server.
const port = 4000

// Handling '/' Request
// app.post("/", (req, res) => {
//   SandboxQueue.getInstance().addJob({ name: "someJob!", data: req.body });
//   res.send(req.body);
// });

// app.use('/user', userRouter)

// Server setup
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`)
})
