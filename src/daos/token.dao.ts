import { Prisma, Token } from '@prisma/client'
import { UnprocessableEntity, NotFound, BadRequest } from 'http-errors'
import { PrismaErrorsEnum } from '../core/enums/prisma-errors.enum'
import { IGenericDao } from '../interfaces/generic-dao.interface'
import { prismaClient } from '../prisma'

export class TokenDao implements Omit<IGenericDao<Token>, 'find' | 'all' | 'update'> {
  async save(data: Prisma.TokenCreateInput): Promise<Token> {
    try {
      const token = await prismaClient.token.create({ data })

      return token
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2025) {
        throw new NotFound('No Token found')
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2003) {
        throw new NotFound('No Token found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error creating Token. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }

  async delete(where: Prisma.TokenWhereUniqueInput): Promise<Token> {
    try {
      return prismaClient.token.delete({ where })
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2025) {
        throw new NotFound('No Token found')
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === PrismaErrorsEnum.P2003) {
        throw new NotFound('No Token found')
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequest('Error creating Token. Try again and check the data sent')
      }

      throw new UnprocessableEntity(error as string)
    }
  }
}
