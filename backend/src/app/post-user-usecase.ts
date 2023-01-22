import { IUserRepository } from './repository-interface/user-repository-interface'
import { IUserFactory } from './factory-interface/user-factory-interface'
import { ITaskQS } from './query-service-interface/task-qs'
import { IUserTaskFactory } from './factory-interface/user-task-factory-interface'
import { IUserTaskRepository } from './repository-interface/user-task-repository-interface'
import { ITeamRepository } from 'src/app/repository-interface/team-repository-interface'
import { TeamService } from 'src/domain/service/team.service'

export class PostUserUseCase {
  private readonly userRepo: IUserRepository
  private readonly userFac: IUserFactory
  private readonly taskQS: ITaskQS
  private readonly userTaskRepo: IUserTaskRepository
  private readonly userTaskFac: IUserTaskFactory
  private readonly teamRepo: ITeamRepository
  //TODOテストのしやすさを考えてteamserviceもDIしたがいいのか
  private readonly teamService: TeamService

  public constructor(
    userRepo: IUserRepository,
    userFac: IUserFactory,
    taskQS: ITaskQS,
    userTaskRepo: IUserTaskRepository,
    userTaskFac: IUserTaskFactory,
    teamRepo: ITeamRepository,
    teamService: TeamService,
  ) {
    this.userRepo = userRepo
    this.userFac = userFac
    this.taskQS = taskQS
    this.userTaskRepo = userTaskRepo
    this.userTaskFac = userTaskFac
    this.teamRepo = teamRepo
    this.teamService = teamService
  }
  public async do(params: { name: string; email: string }) {
    const { name, email } = params
    const userEntity = await this.userFac.create({ name, email })
    await this.userRepo.save(userEntity)
    //全てのタスクのユーザータスクの作成
    const allTasks = await this.taskQS.getAll()
    allTasks?.map(async (task) => {
      const userTask = await this.userTaskFac.create({
        kind: 'Insert',
        userId: userEntity.getAllProperties().id,
        taskId: task.id,
      })
      await this.userTaskRepo.save(userTask)
    })
    //チームメンバーに追加
    const addedTeam = await this.teamService.increaseTeamMember(
      userEntity.getAllProperties().id,
    )
    await this.teamRepo.save(addedTeam)
  }
}
