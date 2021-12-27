import { User } from 'src/domain/entity/User'
import { Status } from 'src/domain/entity/zaiseki-status'
import { IUserRepository } from './repository-interface/user-repository-interface'

export class UpdateUserUseCase {
  private readonly userRepo: IUserRepository
  public constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }
  public async do(params: {
    id: string
    name?: string
    email?: string
    status?: Status
  }) {
    const beforeUser = await this.userRepo.find(params.id)
    const updateUserParams = {
      id: params.id,
      name: params.name ?? beforeUser.name,
      email: params.email ?? beforeUser.email,
      status: params.status ?? beforeUser.status,
    }
    const userEntity = new User(updateUserParams)
    await this.userRepo.update(userEntity)
  }
}
