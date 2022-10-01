import express, { Router } from 'express'
import { authRoutes } from './routes/auth.routes'
import { eventRoutes } from './routes/event.routes'
import { userRoutes } from './routes/user.routes'

const expressRouter = express.Router()

export const router = (app: Router): Router => {
  app.use('/api/v1/auth', authRoutes())
  app.use('/api/v1/users', userRoutes())
  app.use('/api/v1/events', eventRoutes())

  return expressRouter
}
