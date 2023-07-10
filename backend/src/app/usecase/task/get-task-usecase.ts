import { ITaskQS, TaskDTO } from 'src/app/query-service-interface/task-qs'
import { IAuthRepository } from 'src/app/repository-interface/auth-repository-interface'

type Result = {
  auth: boolean
  data: TaskDTO[]
}
export class GetTaskUseCase {
  private readonly taskQS: ITaskQS
  private readonly authRepo: IAuthRepository
  public constructor(taskQS: ITaskQS, authRepo: IAuthRepository) {
    this.taskQS = taskQS
    this.authRepo = authRepo
  }
  public async do(token: string): Promise<Result> {
    try {
      const authResult = await this.authRepo.verify(token)
      if (authResult) {
        const data = await this.taskQS.getAll()
        return {
          auth: true,
          data,
        }
      }
      return {
        auth: false,
        data: [],
      }
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
