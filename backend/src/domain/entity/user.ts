import { Status } from './zaiseki-status'
export class User {
  protected id: string
  public readonly name: string
  public readonly email: string
  public readonly status: Status
  public constructor(props: {
    id: string
    name: string
    email: string
    status?: Status
  }) {
    const { id, name, email, status } = props
    if (!this.validateEmail(email)) {
      throw new Error('Invalid Email')
    }
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
  private validateEmail(email: string) {
    const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
    return regexp.test(email)
  }
}
