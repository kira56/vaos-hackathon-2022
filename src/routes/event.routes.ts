import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import {
  allEvents,
  createEvent,
  deleteEvent,
  eventsByUser,
  updateEvent,
  eventById,
} from '../controllers/event.controller'
import { validateUser } from '../guards/user.guard'

const router = express.Router()

export function eventRoutes(): Router {
  router
    .route('/')
    .all(passport.authenticate('jwt', { session: false }), validateUser)
    .get(asyncHandler(allEvents))
    .post(asyncHandler(createEvent))

  router
    .route('/user')
    .all(passport.authenticate('jwt', { session: false }), validateUser)
    .get(asyncHandler(eventsByUser))

  router
    .route('/:id')
    .all(passport.authenticate('jwt', { session: false }), validateUser)
    .get(asyncHandler(eventById))
    .put(asyncHandler(updateEvent))
    .delete(asyncHandler(deleteEvent))

  return router
}
