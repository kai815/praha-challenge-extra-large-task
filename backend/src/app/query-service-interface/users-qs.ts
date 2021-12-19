import { Status } from 'src/domain/entity/zaiseki-status'

export class UserDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly status: Status
  public constructor(props: {
    id: string
    name: string
    email: string
    status: Status
  }) {
    const { id, name, email, status } = props
    this.id = id
    this.name = name
    this.email = email
    this.status = status
  }
}

export interface IUsersQS {
  getAll(): Promise<UserDTO[]>
}
