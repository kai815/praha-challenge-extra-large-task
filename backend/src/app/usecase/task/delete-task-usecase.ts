import { ITaskRepository } from 'src/app/repository-interface/task-repository-interface'

export class DeleteTaskUseCase {
  private readonly taskRepo: ITaskRepository
  public constructor(taskRepo: ITaskRepository) {
    this.taskRepo = taskRepo
  }
  public async do(params: { id: string }) {
    const { id } = params
    await this.taskRepo.delete(id)
  }
}
