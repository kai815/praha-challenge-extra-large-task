import {
  IUserFactory,
  UserParams,
} from 'src/app/factory-interface/user-factory-interface'
import { IUserRepository } from 'src/app/repository-interface/user-repository-interface'
import { User } from 'src/domain/entity/user'
import { createRandomIdString } from 'src/util/random'

export class UserFactory implements IUserFactory {
  private userRepo: IUserRepository
  public constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }
  public async create(params: UserParams): Promise<User> {
    if (params.id) {
      const beforeUser = await this.userRepo.find(params.id)
      const updateUserParams = {
        id: params.id,
        name: params.name ?? beforeUser.name,
        email: params.email ?? beforeUser.email,
        status: params.status ?? beforeUser.status,
      }
      return new User(updateUserParams)
    } else {
      return new User({
        id: createRandomIdString(),
        name: params.name as string,
        email: params.email as string,
      })
    }
  }
}
