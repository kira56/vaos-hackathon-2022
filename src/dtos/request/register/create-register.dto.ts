import { IsNotEmpty, IsString } from 'class-validator'
import { BaseDto } from '../../base.dto'

export class CreateRegisterDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  readonly eventId: string
}
