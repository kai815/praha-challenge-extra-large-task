import { IUsersQS } from './query-service-interface/users-qs'
export class GetUsersUseCase {
  private readonly userQS: IUsersQS
  public constructor(userQS: IUsersQS) {
    this.userQS = userQS
  }
  public async do() {
    try {
      return await this.userQS.getAll()
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
