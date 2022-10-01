import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class EventUserDto {
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
