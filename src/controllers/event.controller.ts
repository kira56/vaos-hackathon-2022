import { Request, Response } from 'express'
import { User } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { StatusCodes } from 'http-status-codes'
import { CreateEventDto } from '../dtos/request/event/create-event.dto'
import { EventService } from '../services/event.service'
import { EventUserService } from '../services/event-user.service'

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  const dto = plainToClass(CreateEventDto, req.body)
  await dto.isValid()

  const event = await EventService.create(dto)

  const user = req.user as User

  await EventUserService.create(user.id, event.id)

  res.status(StatusCodes.CREATED).json(event)
}
