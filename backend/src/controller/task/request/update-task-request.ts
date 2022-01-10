// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'

export class UpdateTaskRequest {
  @ApiProperty()
  readonly title: string | undefined

  @ApiProperty()
  readonly reason: string | undefined

  @ApiProperty()
  readonly description: string | undefined
}
