export class User {
  public readonly id: string
  public readonly email: string
  public readonly fullname: string | undefined
  public readonly age: number | undefined

  public constructor(props: {
    id: string
    email: string
    fullname: string | undefined
    age: number | undefined
  }) {
    const { id, email, fullname, age } = props
    this.id = id
    this.email = email
    this.fullname = fullname
    this.age = age
  }
}
