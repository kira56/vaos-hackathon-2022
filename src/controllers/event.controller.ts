import { Request, Response } from 'express'
import { User } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { StatusCodes } from 'http-status-codes'
import { CreateEventDto } from '../dtos/request/event/create-event.dto'
import { EventService } from '../services/event.service'
import { RegisterService } from '../services/register.service'
import { UpdateEventDto } from '../dtos/request/event/update-event.dto'

export const allEvents = async (req: Request, res: Response): Promise<void> => {
  const events = await EventService.all()

  res.status(StatusCodes.OK).json(events)
}

export const eventById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const event = await EventService.getById(id)

  res.status(StatusCodes.OK).json(event)
}

export const eventsByUser = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User
  const events = await EventService.eventCreateByUser(user.id)

  res.status(StatusCodes.OK).json(events)
}

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  const dto = plainToClass(CreateEventDto, req.body)
  await dto.isValid()

  const user = req.user as User

  const event = await EventService.create(dto, user.id)

  await RegisterService.create(user.id, event.id, true)

  res.status(StatusCodes.CREATED).json(event)
}

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const dto = plainToClass(UpdateEventDto, req.body)

  const event = await EventService.update(id, dto)

  res.status(StatusCodes.OK).json(event)
}

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  const event = await EventService.delete(id)

  res.status(StatusCodes.NO_CONTENT).json(event)
}
