import { ITaskRepository } from 'src/app/repository-interface/task-repository-interface'
import { ITaskFactory } from 'src/app/factory-interface/task-factory-interface'

export class UpdateTaskUseCase {
  private readonly taskRepo: ITaskRepository
  private readonly taskFac: ITaskFactory
  public constructor(taskRepo: ITaskRepository, taskFac: ITaskFactory) {
    this.taskRepo = taskRepo
    this.taskFac = taskFac
  }
  public async do(params: {
    id: string
    title?: string
    reason?: string
    description?: string
  }) {
    const taskEntity = await this.taskFac.create(params)
    await this.taskRepo.save(taskEntity)
  }
}
