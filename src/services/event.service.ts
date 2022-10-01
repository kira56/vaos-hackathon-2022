import { User } from '@prisma/client'
import { plainToClass, plainToInstance } from 'class-transformer'
import { EventDao } from '../daos/event.dao'
import { CreateEventDto } from '../dtos/request/event/create-event.dto'
import { EventDto } from '../dtos/response/event/event.dto'
import { EventUserService } from './event-user.service'

export class EventService {
  private static eventDao = new EventDao()

  static async all(): Promise<EventDto[]> {
    const events = await this.eventDao.all({})

    return plainToInstance(EventDto, events)
  }

  static async create(input: CreateEventDto): Promise<EventDto> {
    const event = await this.eventDao.save(input)
    // eslint-disable-next-line no-console
    // await EventUserService.create(user.id, event.id)

    return plainToClass(EventDto, event)
  }
}
