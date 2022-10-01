import { EventUser, Prisma } from '@prisma/client'
import { UnprocessableEntity, NotFound, BadRequest } from 'http-errors'
import { PrismaErrorsEnum } from '../core/enums/prisma-errors.enum'
import { IGenericDao } from '../interfaces/generic-dao.interface'
import { prismaClient } from '../prisma'

export class EventUserDao implements IGenericDao<EventUser> {
  async all(params: {
    skip?: number
    take?: number
    cursor?: Prisma.EventUserWhereUniqueInput
    where?: Prisma.EventUserWhereInput
    orderBy?: Prisma.EventUserOrderByWithRelationInput
  }): Promise<EventUser[]> {
    const { skip, take, cursor, where, orderBy } = params

    return prismaClient.eventUser.findMany({ skip, take, cursor, where, orderBy })
  }

  async find(eventUserWhereUniqueInput: Prisma.EventUserWhereUniqueInput): Promise<EventUser | null> {
    return prismaClient.eventUser.findUnique({
      where: eventUserWhereUniqueInput,
      rejectOnNotFound: false,
    })
  }

  async save(data: Prisma.EventUserCreateInput): Promise<EventUser> {
    try {
      const eventUser = await prismaClient.eventUser.create({ data })

      return eventUser
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2025) {
        throw new NotFound('No EventUser found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error creating EventUser. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }

  async update(data: Prisma.EventUserUpdateInput, where: Prisma.EventUserWhereUniqueInput): Promise<EventUser> {
    try {
      return prismaClient.eventUser.update({ data, where })
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == PrismaErrorsEnum.P2025) {
        throw new NotFound('No EventUser found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error updating EventUser. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }

  async delete(where: Prisma.EventUserWhereUniqueInput): Promise<EventUser> {
    try {
      return prismaClient.eventUser.delete({ where })
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2025) {
        throw new NotFound('No EventUser found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error deleting EventUser. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }
}
