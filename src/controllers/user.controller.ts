import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { StatusCodes } from 'http-status-codes'
import { User } from '@prisma/client'
import { CreateUserDto } from '../dtos/request/user/create-user.dto'
import { UserService } from '../services/users.service'
import { UpdateUserDto } from '../dtos/request/user/update-user.dto'
import { Authenticated } from '../core/types/authenticated.type'

export const allUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await UserService.all()
  res.status(StatusCodes.OK).json(users)
}

export const findOneUser = async (req: Request, res: Response): Promise<void> => {
  const { uuid } = req.params

  const user = await UserService.findOne(uuid)

  res.status(StatusCodes.OK).json(user)
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const dto = plainToClass(CreateUserDto, req.body)
  await dto.isValid()

  const user = await UserService.create(dto)

  res.status(StatusCodes.CREATED).json(user)
}

export const me = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User

  const userMe = await UserService.findOne(user.id)

  res.status(StatusCodes.OK).json(userMe)
}

export const updateMe = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User

  const dto = plainToClass(UpdateUserDto, req.body)
  await dto.isValid()

  const userUpdateMe = await UserService.update(user.id, dto)

  res.status(StatusCodes.OK).json(userUpdateMe)
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { uuid } = req.params
  const dto = plainToClass(UpdateUserDto, req.body)

  await dto.isValid()

  const user = await UserService.update(uuid, dto)

  res.status(StatusCodes.OK).json(user)
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { uuid } = req.params

  const userDeleted = await UserService.delete(uuid)

  res.status(StatusCodes.NO_CONTENT).json(userDeleted)
}
