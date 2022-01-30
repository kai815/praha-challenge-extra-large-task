import { IUsersQS } from './query-service-interface/users-qs'
import { Status } from 'src/domain/entity/sintyoku-status'

type SearchUserByTaskParams = {
  taskIds?: string[] | string
  status?: Status
}

export class SearchUserUseCase {
  private readonly userQS: IUsersQS
  public constructor(userQS: IUsersQS) {
    this.userQS = userQS
  }
  public async do(params: SearchUserByTaskParams) {
    try {
      if (typeof params.taskIds === 'string') {
        params.taskIds = [params.taskIds]
      }
      return await this.userQS.search()
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
