import { Event, Prisma } from '@prisma/client'
import { UnprocessableEntity, NotFound, BadRequest } from 'http-errors'
import { PrismaErrorsEnum } from '../core/enums/prisma-errors.enum'
import { IGenericDao } from '../interfaces/generic-dao.interface'
import { prismaClient } from '../prisma'

export class EventDao implements IGenericDao<Event> {
  async all(params: {
    skip?: number
    take?: number
    cursor?: Prisma.EventWhereUniqueInput
    where?: Prisma.EventWhereInput
    orderBy?: Prisma.EventOrderByWithRelationInput
  }): Promise<Event[]> {
    const { skip, take, cursor, where, orderBy } = params

    return prismaClient.event.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        _count: {
          select: {
            registers: true,
          },
        },
      },
    })
  }

  async find(eventWhereUniqueInput: Prisma.EventWhereUniqueInput): Promise<Event | null> {
    return prismaClient.event.findUnique({
      where: eventWhereUniqueInput,
      rejectOnNotFound: false,
      include: {
        user: true,
      },
    })
  }

  async save(data: Prisma.EventCreateInput): Promise<Event> {
    try {
      const event = await prismaClient.event.create({ data })

      return event
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2025) {
        throw new NotFound('No Event found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error creating Event. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }

  async update(data: Prisma.EventUpdateInput, where: Prisma.EventWhereUniqueInput): Promise<Event> {
    try {
      return prismaClient.event.update({ data, where })
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == PrismaErrorsEnum.P2025) {
        throw new NotFound('No Event found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error updating Event. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }

  async delete(where: Prisma.EventWhereUniqueInput): Promise<Event> {
    try {
      return prismaClient.event.delete({ where })
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2025) {
        throw new NotFound('No Event found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error deleting Event. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }
}
