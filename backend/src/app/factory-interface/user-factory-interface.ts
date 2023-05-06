import { User } from 'src/domain/entity/user'
import { Status } from 'src/domain/entity/zaiseki-status'

//TODO idがなかったらnameとemailは必須という型にできるならしたい
export type UserParams = {
  id?: string
  name?: string
  email?: string
  status?: Status
}

export interface IUserFactory {
  create(params: UserParams): Promise<User>
}
