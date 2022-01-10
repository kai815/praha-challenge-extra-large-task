import { ITaskQS } from 'src/app/query-service-interface/task-qs'

export class GetTaskUseCase {
  private readonly taskQS: ITaskQS
  public constructor(taskQS: ITaskQS) {
    this.taskQS = taskQS
  }
  public async do() {
    try {
      return await this.taskQS.getAll()
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
