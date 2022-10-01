import { plainToClass, plainToInstance } from 'class-transformer'
import { EventDao } from '../daos/event.dao'
import { CreateEventDto } from '../dtos/request/event/create-event.dto'
import { UpdateEventDto } from '../dtos/request/event/update-event.dto'
import { EventDto } from '../dtos/response/event/event.dto'
import { RegisterService } from './register.service'

export class EventService {
  private static eventDao = new EventDao()
  private static registerService = RegisterService

  static async all(): Promise<EventDto[]> {
    const events = await this.eventDao.all({})

    return plainToInstance(EventDto, events)
  }

  static async getById(id: string): Promise<EventDto> {
    const event = await this.eventDao.find({ id })

    return plainToClass(EventDto, event)
  }

  static async eventCreateByUser(userId: string): Promise<EventDto[]> {
    const events = await this.eventDao.all({
      where: {
        userId,
      },
    })

    return plainToInstance(EventDto, events)
  }

  static async create(input: CreateEventDto, userId: string): Promise<EventDto> {
    const event = await this.eventDao.save({
      user: {
        connect: {
          id: userId,
        },
      },
      ...input,
    })

    return plainToClass(EventDto, event)
  }

  static async update(id: string, input: UpdateEventDto): Promise<EventDto> {
    const event = await this.eventDao.update(input, { id })

    return plainToClass(EventDto, event)
  }

  static async delete(id: string) {
    const registers = await this.registerService.registerByEvent(id)

    if (registers) {
      await Promise.all(registers.map((item) => this.registerService.hardDelete(item.id)))
    }

    const event = await this.eventDao.delete({ id })

    return plainToClass(EventDto, event)
  }
}
