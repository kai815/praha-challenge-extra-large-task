import { IUserTaskRepository } from 'src/app/repository-interface/user-task-repository-interface'
import { IUserTaskFactory } from 'src/app/factory-interface/user-task-factory-interface'
import { Status } from 'src/domain/entity/sintyoku-status'

export class UpdateUserTaskUseCase {
  private readonly userTaskRepo: IUserTaskRepository
  private readonly userTaskFac: IUserTaskFactory
  public constructor(
    userTaskRepo: IUserTaskRepository,
    userTaskFac: IUserTaskFactory,
  ) {
    this.userTaskRepo = userTaskRepo
    this.userTaskFac = userTaskFac
  }
  public async do(params: { id: string; status: Status }) {
    const userTaskEntity = await this.userTaskFac.create({
      kind: 'Update',
      id: params.id,
      status: params.status,
    })
    await this.userTaskRepo.save(userTaskEntity)
  }
}
