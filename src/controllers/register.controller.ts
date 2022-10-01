import { User } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateRegisterDto } from '../dtos/request/register/create-register.dto'
import { RegisterService } from '../services/register.service'

export const subscribeEvent = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User

  const dto = plainToClass(CreateRegisterDto, req.body)

  const userEvent = await RegisterService.join(dto, user.id)

  res.status(StatusCodes.NO_CONTENT).json(userEvent)
}

export const unsubscribeRegister = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const user = req.user as User

  const register = await RegisterService.delete(id, user.id)

  res.status(StatusCodes.NO_CONTENT).json(register)
}
