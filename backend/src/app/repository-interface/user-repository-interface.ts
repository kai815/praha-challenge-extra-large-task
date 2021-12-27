import { User } from 'src/domain/entity/User'

export interface IUserRepository {
  save(user: User): Promise<User>
  update(user: User): Promise<User>
  delete(id: string): Promise<User>
  find(id: string): Promise<User>
}
