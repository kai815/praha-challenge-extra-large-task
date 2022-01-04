// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { Status } from 'src/domain/entity/zaiseki-status'

export class UpdateUserRequest {
  @ApiProperty()
  readonly name: string | undefined

  @ApiProperty()
  readonly email: string | undefined

  @ApiProperty()
  readonly status: Status | undefined
}
