import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { BaseDto } from '../../base.dto'

export class LoginDto extends BaseDto {
  @IsEmail()
  @IsString()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string
}
