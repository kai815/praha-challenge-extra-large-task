import { ITaskRepository } from 'src/app/repository-interface/task-repository-interface'
import { IUserTaskRepository } from 'src/app/repository-interface/user-task-repository-interface'

export class DeleteTaskUseCase {
  private readonly taskRepo: ITaskRepository
  private readonly userTaskRepo: IUserTaskRepository

  public constructor(
    taskRepo: ITaskRepository,
    userTaskRepo: IUserTaskRepository,
  ) {
    this.taskRepo = taskRepo
    this.userTaskRepo = userTaskRepo
  }
  public async do(params: { id: string }) {
    const { id } = params
    await this.userTaskRepo.deleteBytaskId(id)
    await this.taskRepo.delete(id)
  }
}
