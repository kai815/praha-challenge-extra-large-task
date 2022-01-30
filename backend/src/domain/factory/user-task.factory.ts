import {
  IUserTaskFactory,
  UserTaskParams,
} from 'src/app/factory-interface/user-task-factory-interface'
import { IUserTaskRepository } from 'src/app/repository-interface/user-task-repository-interface'
import { UserTask } from 'src/domain/entity/user-task'
import { createRandomIdString } from 'src/util/random'

export class UserTaskFactory implements IUserTaskFactory {
  private userTaskRepo: IUserTaskRepository
  public constructor(userTaskRepo: IUserTaskRepository) {
    this.userTaskRepo = userTaskRepo
  }
  public async create(params: UserTaskParams): Promise<UserTask> {
    if (params.kind === 'Update') {
      const beforeUserTask = await this.userTaskRepo.find(params.id)
      const updateUserTaskParams = {
        id: params.id,
        status: params.status,
        userId: beforeUserTask.userId,
        taskId: beforeUserTask.taskId,
      }
      return new UserTask(updateUserTaskParams)
    } else {
      return new UserTask({
        id: createRandomIdString(),
        userId: params.userId,
        taskId: params.taskId,
      })
    }
  }
}
