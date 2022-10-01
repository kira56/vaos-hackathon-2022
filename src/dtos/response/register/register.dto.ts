import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class RegisterDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly moderator: boolean

  @Expose()
  readonly userId: string

  @Expose()
  readonly eventId: string

  @Expose()
  readonly createAt: Date

  @Expose()
  readonly updateAt: Date
}
