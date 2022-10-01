import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class EventDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly title: boolean

  @Expose()
  readonly description: string

  @Expose()
  readonly createAt: Date

  @Expose()
  readonly updateAt: Date

  @Expose()
  readonly _count: unknown
}
