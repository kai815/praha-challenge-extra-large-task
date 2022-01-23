import { ITaskRepository } from 'src/app/repository-interface/task-repository-interface'
import { ITaskFactory } from 'src/app/factory-interface/task-factory-interface'
import { IUsersQS } from 'src/app/query-service-interface/users-qs'
import { IUserTaskFactory } from 'src/app/factory-interface/user-task-factory-interface'
import { IUserTaskRepository } from 'src/app/repository-interface/user-task-repository-interface'

export class PostTaskUseCase {
  private readonly taskRepo: ITaskRepository
  private readonly taskFac: ITaskFactory
  private readonly userQS: IUsersQS
  private readonly userTaskRepo: IUserTaskRepository
  private readonly userTaskFac: IUserTaskFactory
  public constructor(
    taskRepo: ITaskRepository,
    taskFac: ITaskFactory,
    userQS: IUsersQS,
    userTaskRepo: IUserTaskRepository,
    userTaskFac: IUserTaskFactory,
  ) {
    this.taskRepo = taskRepo
    this.taskFac = taskFac
    this.userQS = userQS
    this.userTaskRepo = userTaskRepo
    this.userTaskFac = userTaskFac
  }
  public async do(params: {
    title: string
    reason: string
    description: string
  }) {
    const taskEntity = await this.taskFac.create(params)
    await this.taskRepo.save(taskEntity)
    //全てのユーザーのユーザータスクの作成
    const allUsers = await this.userQS.getAll()
    allUsers.map(async (user) => {
      const userTask = await this.userTaskFac.create({
        kind: 'Insert',
        userId: user.id,
        taskId: taskEntity.getAllProperties().id,
      })
      this.userTaskRepo.save(userTask)
    })
  }
}
