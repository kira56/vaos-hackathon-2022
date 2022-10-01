import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import { allUsers, createUser, deleteUser, findOneUser, me, updateMe, updateUser } from '../controllers/user.controller'
// import { validateMaster } from '../guards/admin.guard'
import { validateUser } from '../guards/user.guard'

const router = express.Router()

export function userRoutes(): Router {
  router
    .route('/me')
    .all(passport.authenticate('jwt', { session: false }))
    .get(asyncHandler(me))
    .patch(asyncHandler(updateMe))

  router
    .route('/')
    .all(passport.authenticate('jwt', { session: false }), validateUser)
    .get(asyncHandler(allUsers))

  router.route('/signup').post(asyncHandler(createUser))

  router
    .route('/:uuid')
    .all(passport.authenticate('jwt', { session: false }))
    .get(asyncHandler(findOneUser))

  return router
}
