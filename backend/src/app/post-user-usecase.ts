import { IUserRepository } from './repository-interface/user-repository-interface'
import { IUserFactory } from './factory-interface/user-factory-interface'

export class PostUserUseCase {
  private readonly userRepo: IUserRepository
  private readonly userFac: IUserFactory
  public constructor(userRepo: IUserRepository, userFac: IUserFactory) {
    this.userRepo = userRepo
    this.userFac = userFac
  }
  public async do(params: { name: string; email: string }) {
    const { name, email } = params
    const userEntity = await this.userFac.create({ name, email })
    await this.userRepo.save(userEntity)
  }
}
