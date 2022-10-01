import { Unauthorized } from 'http-errors'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { prismaClient } from '../prisma'

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY as string,
    },
    async (jwtPayload, done) => {
      const token = await prismaClient.token.findUnique({
        where: {
          jti: jwtPayload.sub,
        },
        select: {
          user: { select: { id: true, email: true } },
        },
        rejectOnNotFound: false,
      })

      if (!token) {
        return done(new Unauthorized('Invalid credentials'), null)
      }

      return done(null, token.user)
    },
  ),
)
