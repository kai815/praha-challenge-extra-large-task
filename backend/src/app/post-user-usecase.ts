import { IUserRepository } from './repository-interface/user-repository-interface'
import { IUserFactory } from './factory-interface/user-factory-interface'
import { ITaskQS } from './query-service-interface/task-qs'
import { IUserTaskFactory } from './factory-interface/user-task-factory-interface'
import { IUserTaskRepository } from './repository-interface/user-task-repository-interface'

export class PostUserUseCase {
  private readonly userRepo: IUserRepository
  private readonly userFac: IUserFactory
  private readonly taskQS: ITaskQS
  private readonly userTaskRepo: IUserTaskRepository
  private readonly userTaskFac: IUserTaskFactory

  public constructor(
    userRepo: IUserRepository,
    userFac: IUserFactory,
    taskQS: ITaskQS,
    userTaskRepo: IUserTaskRepository,
    userTaskFac: IUserTaskFactory,
  ) {
    this.userRepo = userRepo
    this.userFac = userFac
    this.taskQS = taskQS
    this.userTaskRepo = userTaskRepo
    this.userTaskFac = userTaskFac
  }
  public async do(params: { name: string; email: string }) {
    const { name, email } = params
    const userEntity = await this.userFac.create({ name, email })
    await this.userRepo.save(userEntity)
    //全てのタスクのユーザータスクの作成
    const allTasks = await this.taskQS.getAll()
    allTasks.map(async (task) => {
      const userTask = await this.userTaskFac.create({
        kind: 'Insert',
        userId: userEntity.getAllProperties().id,
        taskId: task.id,
      })
      this.userTaskRepo.save(userTask)
    })
  }
}
