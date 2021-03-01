// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PostUserRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email!: string

  @ApiProperty()
  @IsString()
  readonly fullname: string | undefined

  @ApiProperty()
  @IsNumber()
  readonly age: number | undefined
}
