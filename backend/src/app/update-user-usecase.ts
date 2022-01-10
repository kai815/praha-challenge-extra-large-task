import { Status } from 'src/domain/entity/zaiseki-status'
import { IUserRepository } from './repository-interface/user-repository-interface'
import { IUserFactory } from './factory-interface/user-factory-interface'

export class UpdateUserUseCase {
  private readonly userRepo: IUserRepository
  private readonly userFac: IUserFactory
  public constructor(userRepo: IUserRepository, userFac: IUserFactory) {
    this.userRepo = userRepo
    this.userFac = userFac
  }
  public async do(params: {
    id: string
    name?: string
    email?: string
    status?: Status
  }) {
    const userEntity = await this.userFac.create(params)
    await this.userRepo.save(userEntity)
  }
}
