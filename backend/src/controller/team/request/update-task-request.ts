// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'

export class UpdateTeamRequest {
  @ApiProperty()
  readonly pairIds!: string[]
}
