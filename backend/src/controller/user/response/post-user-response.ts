import { ApiProperty } from '@nestjs/swagger'

export class PostUserResponse {
  @ApiProperty()
  id: string

  @ApiProperty()
  email: string

  @ApiProperty()
  fullname: string | undefined

  @ApiProperty()
  age: number | undefined

  public constructor(params: {
    id: string
    email: string
    fullname: string | undefined
    age: number | undefined
  }) {
    this.id = params.id
    this.email = params.email
    this.fullname = params.fullname
    this.age = params.age
  }
}
