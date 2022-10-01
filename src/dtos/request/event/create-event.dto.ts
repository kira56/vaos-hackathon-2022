import { IsNotEmpty, IsString } from 'class-validator'
import { BaseDto } from '../../base.dto'

export class CreateEventDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsNotEmpty()
  @IsString()
  readonly description: string
}
