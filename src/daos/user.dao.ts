import { User, Prisma } from '@prisma/client'
import { UnprocessableEntity, NotFound, BadRequest } from 'http-errors'
import { PrismaErrorsEnum } from '../core/enums/prisma-errors.enum'
import { IGenericDao } from '../interfaces/generic-dao.interface'
import { prismaClient } from '../prisma'

export class UserDao implements IGenericDao<User> {
  async all(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params

    return prismaClient.user.findMany({ skip, take, cursor, where, orderBy })
  }

  async find(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return prismaClient.user.findUnique({
      where: userWhereUniqueInput,
      rejectOnNotFound: false,
    })
  }

  async save(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const user = await prismaClient.user.create({ data })

      return user
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2025) {
        throw new NotFound('No User found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error creating User. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }

  async update(data: Prisma.UserUpdateInput, where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return prismaClient.user.update({ data, where })
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == PrismaErrorsEnum.P2025) {
        throw new NotFound('No User found')
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == PrismaErrorsEnum.P2002) {
        throw new UnprocessableEntity('Email already taken')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error updating User. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return prismaClient.user.delete({ where })
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2025) {
        throw new NotFound('No User found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error deleting User. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }
}
