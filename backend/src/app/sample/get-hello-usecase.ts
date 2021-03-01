import { IHelloQS } from './query-service-interface/hello-qs'

export class GetHelloUseCase {
  private readonly helloQS: IHelloQS
  public constructor(helloQS: IHelloQS) {
    this.helloQS = helloQS
  }
  public async do() {
    try {
      return await this.helloQS.getAll()
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
