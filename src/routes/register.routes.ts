import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import { subscribeEvent, unsubscribeRegister } from '../controllers/register.controller'
import { validateUser } from '../guards/user.guard'

const router = express.Router()

export function registerRoutes(): Router {
  router
    .route('/')
    .all(passport.authenticate('jwt', { session: false }), validateUser)
    .post(asyncHandler(subscribeEvent))

  router
    .route('/:id')
    .all(passport.authenticate('jwt', { session: false }), validateUser)
    .delete(asyncHandler(unsubscribeRegister))

  return router
}
