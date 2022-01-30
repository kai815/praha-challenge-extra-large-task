// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { Status } from 'src/domain/entity/sintyoku-status'

export class SearchUserQuery {
  @ApiProperty()
  readonly taskIds: string[] | undefined

  @ApiProperty()
  readonly status: Status | undefined
}
