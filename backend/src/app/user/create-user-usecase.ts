import { createRandomIdString } from 'src/util/random'
import { User } from '../../domain/user/entity/user'
import { IUserRepository } from './repository-interface/user-repository'

export class CreateUserUseCase {
  private readonly userRepo: IUserRepository
  public constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }

  public async do(params: {
    email: string
    fullname: string | undefined
    age: number | undefined
  }) {
    const userEntity = new User({
      id: createRandomIdString(),
      email: params.email,
      fullname: params.fullname,
      age: params.age,
    })
    const userSaved = await this.userRepo.save(userEntity)

    return userSaved
  }
}
