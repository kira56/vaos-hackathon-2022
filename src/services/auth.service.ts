import { Token, User } from '@prisma/client'
import { Unauthorized, Forbidden } from 'http-errors'
import { compareSync } from 'bcryptjs'
import { verify, sign } from 'jsonwebtoken'
import { TokenDao } from '../daos/token.dao'
import { UserDao } from '../daos/user.dao'
import { LoginDto } from '../dtos/request/auth/login.dto'
import { TokenDto } from '../dtos/response/token/token.dto'
export class AuthService {
  private static tokenDao = new TokenDao()
  private static userDao = new UserDao()

  static async login(input: LoginDto): Promise<TokenDto> {
    const { email, password } = input

    const user = await this.userDao.find({ email })

    if (!user) {
      throw new Unauthorized('Invalid credentials')
    }

    const passwordCorrect = compareSync(password, user.password)

    if (!passwordCorrect) {
      throw new Unauthorized('Invalid credentials')
    }

    const token = await this.createToken(user.id)

    return this.generateAccessToken(token.jti)
  }

  static async createToken(id: string): Promise<Token> {
    const token = await this.tokenDao.save({
      user: {
        connect: {
          id,
        },
      },
    })

    return token
  }

  static async logout(accessToken?: string): Promise<void> {
    if (!accessToken) return
    try {
      const { sub } = verify(accessToken, process.env.JWT_SECRET_KEY as string)

      await this.tokenDao.delete({ jti: sub as string })
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  static generateAccessToken(sub: string): TokenDto {
    const now = new Date().getTime()
    const exp = Math.floor(new Date(now).setSeconds(parseInt(process.env.JWT_EXPIRATION_TIME as string, 10)) / 1000)

    const iat = Math.floor(now / 1000)

    const accessToken = sign(
      {
        sub,
        iat,
        exp,
      },
      process.env.JWT_SECRET_KEY as string,
    )

    return {
      accessToken,
      exp,
    }
  }

  static validateUser(user: User): void {
    if (!user) {
      throw new Forbidden('The current user does not have the enough privileges')
    }
  }
}
