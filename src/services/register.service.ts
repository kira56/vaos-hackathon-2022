import { plainToClass, plainToInstance } from 'class-transformer'
import { BadRequest } from 'http-errors'
import { EventDao } from '../daos/event.dao'
import { RegisterDao } from '../daos/register.dao'
import { CreateRegisterDto } from '../dtos/request/register/create-register.dto'
import { RegisterDto } from '../dtos/response/register/register.dto'

export class RegisterService {
  private static registerDao = new RegisterDao()

  static async registerByEvent(eventId: string): Promise<RegisterDto[]> {
    const registers = await this.registerDao.all({
      where: {
        eventId,
      },
    })

    return plainToInstance(RegisterDto, registers)
  }

  static async create(userId: string, eventId: string, moderator?: boolean): Promise<void> {
    await this.registerDao.save({
      event: {
        connect: {
          id: eventId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      moderator,
    })
  }

  static async join(input: CreateRegisterDto, userId: string): Promise<RegisterDto> {
    const { eventId } = input

    const findByUser = await this.registerDao.findFirst({ userId })

    if (findByUser) {
      throw new BadRequest('User already subscribe in this event')
    }

    const result = await this.registerDao.save({
      event: {
        connect: {
          id: eventId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    })

    return plainToClass(RegisterDto, result)
  }

  static async delete(eventId: string, userId: string): Promise<RegisterDto> {
    const registerFirst = await this.registerDao.findFirst({
      eventId,
      userId,
    })

    const register = await this.registerDao.delete({ id: registerFirst?.id })

    return plainToClass(RegisterDto, register)
  }

  static async hardDelete(id: string): Promise<RegisterDto> {
    const register = await this.registerDao.delete({ id })

    return plainToClass(RegisterDto, register)
  }
}
