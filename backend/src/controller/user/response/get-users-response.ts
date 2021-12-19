import { ApiProperty } from '@nestjs/swagger'
import { UserDTO } from 'src/app/query-service-interface/users-qs'
import { Status } from 'src/domain/entity/zaiseki-status'

export class GetUsersResponse {
  @ApiProperty({ type: () => [User] })
  users: User[]

  public constructor(params: { users: UserDTO[] }) {
    const { users } = params
    this.users = users.map(({ id, name, email, status }) => {
      return new User({
        id,
        name,
        email,
        status,
      })
    })
  }
}

class User {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  status: Status

  public constructor(params: {
    id: string
    name: string
    email: string
    status: Status
  }) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.status = params.status
  }
}
