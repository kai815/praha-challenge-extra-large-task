import { IUsersQS } from './query-service-interface/users-qs'
import { Status } from 'src/domain/entity/sintyoku-status'

type SearchUserUseCaseParams = {
  taskIds?: string[] | string
  status?: Status
}
export class SearchUserUseCase {
  private readonly userQS: IUsersQS
  public constructor(userQS: IUsersQS) {
    this.userQS = userQS
  }
  public async do(params: SearchUserUseCaseParams) {
    try {
      let searchParams
      if (typeof params.taskIds === 'string') {
        searchParams = {
          taskIds: [params.taskIds],
          status: params.status,
        }
      } else {
        searchParams = {
          taskIds: params.taskIds,
          status: params.status,
        }
      }
      return await this.userQS.search(searchParams)
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
