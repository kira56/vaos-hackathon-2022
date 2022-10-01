import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import { createEvent } from '../controllers/event.controller'
import { validateUser } from '../guards/user.guard'

const router = express.Router()

export function eventRoutes(): Router {
  router
    .route('/')
    .all(passport.authenticate('jwt', { session: false }), validateUser)
    .post(asyncHandler(createEvent))

  return router
}
