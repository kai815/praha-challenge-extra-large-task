import {
  ITaskFactory,
  TaskParams,
} from 'src/app/factory-interface/task-factory-interface'
import { ITaskRepository } from 'src/app/repository-interface/task-repository-interface'
import { Task } from 'src/domain/entity/task'
import { createRandomIdString } from 'src/util/random'

export class TaskFactory implements ITaskFactory {
  private taskRepo: ITaskRepository
  public constructor(taskRepo: ITaskRepository) {
    this.taskRepo = taskRepo
  }
  public async create(params: TaskParams): Promise<Task> {
    if (params.id) {
      const beforeTask = await this.taskRepo.find(params.id)
      const updateTaskParams = {
        id: params.id,
        title: params.title ?? beforeTask.title,
        reason: params.reason ?? beforeTask.reason,
        description: params.description ?? beforeTask.description,
      }
      return new Task(updateTaskParams)
    } else {
      return new Task({
        id: createRandomIdString(),
        title: params.title as string,
        reason: params.reason as string,
        description: params.description as string,
      })
    }
  }
}
