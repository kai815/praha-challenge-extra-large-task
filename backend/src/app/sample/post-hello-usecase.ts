import { Hello } from 'src/domain/sample/entity/hello'
import { createRandomIdString } from 'src/util/random'
import { IHelloRepository } from './repository-interface/hello-repository'

export class PostHelloUseCase {
  private readonly helloRepo: IHelloRepository
  public constructor(helloRepo: IHelloRepository) {
    this.helloRepo = helloRepo
  }
  public async do(params: {
    hello: string
    required: boolean
    number: number
    userIds: string[]
  }) {
    const { hello, required, number, userIds } = params

    const helloEntity = new Hello({
      id: createRandomIdString(),
      hello,
      required,
      number,
      userIds,
    })
    await this.helloRepo.save(helloEntity)
  }
}
