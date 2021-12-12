export class User {
  private id: string
  private name: string
  private email: string
  private number: number
  public constructor(props: {
    id: string
    name: string
    email: string
    number: number
  }) {
    const { id, name, email, number } = props
    this.id = id
    this.name = name
    this.email = email
    this.number = number
  }
}
