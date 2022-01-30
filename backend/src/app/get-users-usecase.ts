import { IUsersQS } from './query-service-interface/users-qs'
import { Status } from 'src/domain/entity/sintyoku-status'

type GetUserParams = {
  taskIds?: string[]
  status?: Status
}
export class GetUsersUseCase {
  private readonly userQS: IUsersQS
  public constructor(userQS: IUsersQS) {
    this.userQS = userQS
  }
  public async do(params: GetUserParams) {
    try {
      if (params.taskIds && params.status) {
        return await this.userQS.search()
      }
      return await this.userQS.getAll()
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
