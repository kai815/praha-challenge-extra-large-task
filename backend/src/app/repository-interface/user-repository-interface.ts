import { User } from 'src/domain/entity/User'

export interface IUserRepository {
  save(user: User): Promise<User>
}
