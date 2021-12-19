import { User } from 'src/domain/entity/User'
import { Status } from 'src/domain/entity/zaiseki-status'
import { IUserRepository } from './repository-interface/user-repository-interface'
import { IUsersQS } from './query-service-interface/users-qs'

export class UpdateUserUseCase {
  private readonly userRepo: IUserRepository
  private readonly userQS: IUsersQS
  public constructor(userRepo: IUserRepository, userQS: IUsersQS) {
    this.userRepo = userRepo
    this.userQS = userQS
  }
  public async do(params: {
    id: string
    name?: string
    email?: string
    status?: Status
  }) {
    const beforeUser = await this.userQS.getById(params.id)
    const updatingUser = {
      id: beforeUser.id,
      name: params.name ?? beforeUser.name,
      email: params.email ?? beforeUser.email,
      status: params.status ?? beforeUser.status,
    }
    const userEntity = new User(updatingUser)
    await this.userRepo.update(userEntity)
  }
}
