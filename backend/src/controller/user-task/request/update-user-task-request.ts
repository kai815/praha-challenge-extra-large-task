// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Status } from 'src/domain/entity/sintyoku-status'

export class UpdateUserTaskRequest {
  @ApiProperty()
  // @IsNotEmpty()
  readonly userId: string | undefined

  @ApiProperty()
  @IsNotEmpty()
  readonly status!: Status
}
