import express, { Express, NextFunction, Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import './guards/passport'
import passport from 'passport'
import { HttpError } from 'http-errors'
import { plainToClass } from 'class-transformer'
import { router } from './routes'
import { HttpErrorDto } from './dtos/http-error.dto'

const app: Express = express()

const PORT = process.env.PORT || 8080
const ENVIROMENT = process.env.NODE_ENV || 'development'

app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const whiteList = ['http://localhost:8080']
const corsOptionsDelegate = function handler(
  req: Request,
  callback: (err: Error | null, options?: CorsOptions) => void,
) {
  const corsOptions: { origin: boolean } = { origin: false }

  if (whiteList.indexOf(req.header('Origin') ?? '') !== -1) {
    corsOptions.origin = true
  }

  callback(null, corsOptions)
}

function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void {
  if (ENVIROMENT !== 'development') {
    // eslint-disable-next-line no-console
    console.error(err.message)
    // eslint-disable-next-line no-console
    console.error(err.stack || '')
  }

  res.status(err.status ?? 500)
  res.json(plainToClass(HttpErrorDto, err))
}

app.use(cors(corsOptionsDelegate))

app.get('/', (req: Request, res: Response) => {
  res.json({
    time: new Date().toISOString(),
  })
})

app.use('/', router(app))
app.use(errorHandler)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server connecte on port %d`, PORT, ENVIROMENT)
})
