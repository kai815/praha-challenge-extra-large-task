// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class PostUserRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly name!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly email!: string
}
