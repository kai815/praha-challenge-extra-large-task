import { IUserRepository } from './repository-interface/user-repository-interface'
import { IUserTaskRepository } from 'src/app/repository-interface/user-task-repository-interface'

export class DeleteUserUseCase {
  private readonly userRepo: IUserRepository
  private readonly userTaskRepo: IUserTaskRepository
  public constructor(
    userRepo: IUserRepository,
    userTaskRepo: IUserTaskRepository,
  ) {
    this.userRepo = userRepo
    this.userTaskRepo = userTaskRepo
  }
  public async do(params: { id: string }) {
    const { id } = params
    await this.userTaskRepo.deleteByUserId(id)
    await this.userRepo.delete(id)
  }
}
