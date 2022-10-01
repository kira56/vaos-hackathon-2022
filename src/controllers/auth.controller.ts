import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from '../dtos/request/auth/login.dto'
import { AuthService } from '../services/auth.service'

export const login = async (req: Request, res: Response): Promise<void> => {
  const dto = plainToClass(LoginDto, req.body)
  await dto.isValid()

  const result = await AuthService.login(dto)

  res.status(StatusCodes.OK).json(result)
}

export const logout = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '')

  await AuthService.logout(accessToken)

  res.status(StatusCodes.NO_CONTENT).send()
}
