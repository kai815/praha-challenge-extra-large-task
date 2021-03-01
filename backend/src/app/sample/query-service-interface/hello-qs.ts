export class HelloDTO {
  public readonly id: string
  public readonly hello: string
  public readonly required: boolean
  public readonly number: number
  public constructor(props: {
    id: string
    hello: string
    required: boolean
    number: number
  }) {
    const { id, hello, required, number } = props
    this.id = id
    this.hello = hello
    this.required = required
    this.number = number
  }
}

export interface IHelloQS {
  getAll(): Promise<HelloDTO[]>
}
