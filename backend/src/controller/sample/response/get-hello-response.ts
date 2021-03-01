import { ApiProperty } from '@nestjs/swagger'
import { HelloDTO } from 'src/app/sample/query-service-interface/hello-qs'

export class GetHelloResponse {
  @ApiProperty({ type: () => [Hello] })
  hellos: Hello[]

  public constructor(params: { hellos: HelloDTO[] }) {
    const { hellos } = params
    this.hellos = hellos.map(({ id, hello, required, number }) => {
      return new Hello({
        id,
        hello,
        required,
        number,
      })
    })
  }
}

class Hello {
  @ApiProperty()
  id: string

  @ApiProperty()
  hello: string

  @ApiProperty()
  required: boolean

  @ApiProperty()
  number: number

  public constructor(params: {
    id: string
    hello: string
    required: boolean
    number: number
  }) {
    this.id = params.id
    this.hello = params.hello
    this.required = params.required
    this.number = params.number
  }
}
