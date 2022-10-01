import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator'
import { Exclude, Expose } from 'class-transformer'
import { BaseDto } from '../../base.dto'
import { Locations } from '../../../core/enums/location.enum'

@Exclude()
export class UpdateUserDto extends BaseDto {
  @Expose()
  @IsOptional()
  @IsString()
  readonly name?: string

  @Expose()
  @IsOptional()
  @IsEmail()
  readonly email?: string

  @Expose()
  @IsOptional()
  @IsString()
  @Length(6, 20)
  readonly password?: string

  @Expose()
  @IsString()
  @IsOptional()
  readonly avatar?: string

  @Expose()
  @IsEnum(Locations)
  @IsOptional()
  readonly location?: Locations
}
