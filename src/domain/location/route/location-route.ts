import * as express from 'express'

const locationRouter = express.Router()

locationRouter.use((req, res, next) => {
  // middleware
  next()
})

locationRouter.post('/create-regions', express.json(), (req, res) => {
  // Validate inputs
  // Create location
})

locationRouter.post('/create-zone', express.json(), (req, res) => {
  // Validate inputs
  // Create zone
})

locationRouter.post('/create-area', express.json(), (req, res) => {
  // Validate inputs
  // Create location
})
