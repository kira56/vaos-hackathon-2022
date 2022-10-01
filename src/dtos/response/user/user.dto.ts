import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class UserDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly name: string

  @Expose()
  readonly email: string

  @Expose()
  readonly avatar: string

  @Expose()
  readonly createAt: Date

  @Expose()
  readonly updateAt: Date
}
