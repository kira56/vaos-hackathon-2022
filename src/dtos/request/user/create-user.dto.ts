import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { Locations } from '../../../core/enums/location.enum'
import { BaseDto } from '../../base.dto'

export class CreateUserDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  readonly password: string

  @IsEnum(Locations)
  @IsNotEmpty()
  readonly location: Locations

  @IsString()
  @IsOptional()
  readonly avatar?: string
}
