import { Exclude, Expose } from 'class-transformer'
import { IsDateString, IsOptional, IsString } from 'class-validator'
import { BaseDto } from '../../base.dto'

@Exclude()
export class UpdateEventDto extends BaseDto {
  @Expose()
  @IsOptional()
  @IsString()
  readonly title?: string

  @Expose()
  @IsOptional()
  @IsString()
  readonly description?: string

  @Expose()
  @IsOptional()
  @IsDateString()
  readonly eventAt?: Date
}
