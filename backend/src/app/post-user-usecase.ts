import { User } from 'src/domain/entity/User'
import { createRandomIdString } from 'src/util/random'
import { IUserRepository } from './repository-interface/user-repository-interface'

export class PostUserUseCase {
  private readonly userRepo: IUserRepository
  public constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }
  public async do(params: { name: string; email: string }) {
    const { name, email } = params

    const userEntity = new User({
      id: createRandomIdString(),
      name,
      email,
      status: 'Inmembership',
    })
    await this.userRepo.save(userEntity)
  }
}
