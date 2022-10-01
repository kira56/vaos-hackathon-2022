import { Register, Prisma } from '@prisma/client'
import { UnprocessableEntity, NotFound, BadRequest } from 'http-errors'
import { PrismaErrorsEnum } from '../core/enums/prisma-errors.enum'
import { IGenericDao } from '../interfaces/generic-dao.interface'
import { prismaClient } from '../prisma'

export class RegisterDao implements IGenericDao<Register> {
  async all(params: {
    skip?: number
    take?: number
    cursor?: Prisma.RegisterWhereUniqueInput
    where?: Prisma.RegisterWhereInput
    orderBy?: Prisma.RegisterOrderByWithRelationInput
  }): Promise<Register[]> {
    const { skip, take, cursor, where, orderBy } = params

    return prismaClient.register.findMany({ skip, take, cursor, where, orderBy })
  }

  async find(registerWhereUniqueInput: Prisma.RegisterWhereUniqueInput): Promise<Register | null> {
    return prismaClient.register.findUnique({
      where: registerWhereUniqueInput,
      rejectOnNotFound: false,
    })
  }

  async findFirst(registerWhereInput: Prisma.RegisterWhereInput): Promise<Register | null> {
    return prismaClient.register.findFirst({
      where: registerWhereInput,
      rejectOnNotFound: false,
    })
  }

  async save(data: Prisma.RegisterCreateInput): Promise<Register> {
    try {
      const eventUser = await prismaClient.register.create({ data })

      return eventUser
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2025) {
        throw new NotFound('No Register found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error creating Register. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }

  async update(data: Prisma.RegisterUpdateInput, where: Prisma.RegisterWhereUniqueInput): Promise<Register> {
    try {
      return prismaClient.register.update({ data, where })
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == PrismaErrorsEnum.P2025) {
        throw new NotFound('No Register found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error updating Register. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }

  async delete(where: Prisma.RegisterWhereUniqueInput): Promise<Register> {
    try {
      return prismaClient.register.delete({ where })
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2025) {
        throw new NotFound('No Register found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error deleting EventUser. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }
}
