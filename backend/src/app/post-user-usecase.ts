import { IUserRepository } from './repository-interface/user-repository-interface'
import { UserFactory } from 'src/domain/factory/user.factory'

export class PostUserUseCase {
  private readonly userRepo: IUserRepository
  public constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }
  public async do(params: { name: string; email: string }) {
    const { name, email } = params
    const userFac = new UserFactory(this.userRepo)
    const userEntity = await userFac.create({ name, email })
    await this.userRepo.save(userEntity)
  }
}
