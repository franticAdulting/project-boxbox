/* eslint sort-imports: 0*/
// Import the express in typescript files
import cors from 'cors'
import express from 'express'
import 'reflect-metadata'
import { SError } from 'verror'
import { getLogger } from '../logger'
import resourceRouter from './router/resource-router'
// import userRouter from './router/user-router'

const logger = getLogger()

// Initialize the express engine
const app: express.Application = express()
app.use(express.json())

// const whitelist = ['http://localhost:3000']
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

app.use('/resource', resourceRouter)
// app.use('/user', userRouter)

// Error handling middleware. Define after all other `app.use()`
// @ts-ignore
app.use((err: SError, req, res, next) => {
  // logger.error(err.message, {
  //   name: err.name,
  //   cause: err.cause ?? '',
  //   stack: err.stack,
  // })
  res.status(500).send({
    traceId: req.body.traceId,
    isSuccess: false,
    result: {
      name: err.name,
    },
  })
})

// Server setup
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`)
})
