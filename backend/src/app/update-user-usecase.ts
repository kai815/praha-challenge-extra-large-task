import { Status } from 'src/domain/entity/zaiseki-status'
import { IUserRepository } from './repository-interface/user-repository-interface'
import { UserFactory } from 'src/domain/factory/user.factory'

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
    const userFac = new UserFactory(this.userRepo)
    const userEntity = await userFac.create(params)
    await this.userRepo.save(userEntity)
  }
}
