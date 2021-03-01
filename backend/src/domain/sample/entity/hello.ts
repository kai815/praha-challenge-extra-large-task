export class Hello {
  private id: string
  private hello: string
  private required: boolean
  private number: number
  private userIds: string[]
  public constructor(props: {
    id: string
    hello: string
    required: boolean
    number: number
    userIds: string[]
  }) {
    const { id, hello, required, number, userIds } = props
    this.id = id
    this.hello = hello
    this.required = required
    this.number = number
    this.userIds = userIds
  }

  public getAllProperties() {
    return {
      id: this.id,
      hello: this.hello,
      required: this.required,
      number: this.number,
      userIds: this.userIds,
    }
  }
}
