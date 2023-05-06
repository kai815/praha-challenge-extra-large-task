import { User } from 'src/domain/entity/user'

export interface IUserRepository {
  save(user: User): Promise<User>
  delete(id: string): Promise<User>
  find(id: string): Promise<User>
}
