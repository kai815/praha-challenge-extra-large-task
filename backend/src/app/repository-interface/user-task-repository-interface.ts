import { UserTask } from 'src/domain/entity/user-task'

export interface IUserTaskRepository {
  save(userTask: UserTask): Promise<UserTask>
  find(id: string): Promise<UserTask>
  deleteBytaskId(taskId: string): Promise<void>
}
