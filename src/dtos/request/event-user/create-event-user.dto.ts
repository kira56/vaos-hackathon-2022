import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { BaseDto } from '../../base.dto'

export class CreateEventUserDto extends BaseDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly moderator: boolean

  @IsNotEmpty()
  @IsString()
  readonly userId: string

  @IsNotEmpty()
  @IsString()
  readonly eventId: string
}
