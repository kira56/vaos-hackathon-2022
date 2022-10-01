import { plainToClass, plainToInstance } from 'class-transformer'
import { UnprocessableEntity } from 'http-errors'
import { genSalt, genSaltSync, hashSync } from 'bcryptjs'
import { UserDao } from '../daos/user.dao'
import { CreateUserDto } from '../dtos/request/user/create-user.dto'
import { UpdateUserDto } from '../dtos/request/user/update-user.dto'
import { UserDto } from '../dtos/response/user/user.dto'
import { TokenDto } from '../dtos/response/token/token.dto'
import { AuthService } from './auth.service'

export class UserService {
  private static userDao = new UserDao()

  static async all(): Promise<UserDto[]> {
    const users = await this.userDao.all({})

    return plainToInstance(UserDto, users)
  }

  static async findOne(id: string): Promise<UserDto> {
    const user = await this.userDao.find({ id })

    return plainToClass(UserDto, user)
  }

  static async create(input: CreateUserDto): Promise<TokenDto> {
    const { email, password } = input

    const userExist = await this.userDao.find({ email })

    if (userExist) {
      throw new UnprocessableEntity('Email is already exists')
    }

    const salt = genSaltSync(10)

    const user = await this.userDao.save({
      ...input,
      password: hashSync(password, salt),
    })

    const token = await AuthService.createToken(user.id)

    return AuthService.generateAccessToken(token.jti)
  }

  static async update(id: string, input: UpdateUserDto): Promise<UserDto> {
    const { password, ...data } = input

    const salt = await genSalt(10)

    const user = await this.userDao.update({ ...data, ...(password && { password: hashSync(password, salt) }) }, { id })

    return plainToClass(UserDto, user)
  }

  static async delete(id: string): Promise<UserDto> {
    const user = await this.userDao.delete({ id })

    return plainToClass(UserDto, user)
  }
}
