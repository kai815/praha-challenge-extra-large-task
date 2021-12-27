import { Status } from './zaiseki-status'
export class User {
  private id: string
  public readonly name: string
  public readonly email: string
  public readonly status?: Status
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
    this.status = status ?? 'Inmembership'
  }
  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      status: this.status,
    }
  }
}
