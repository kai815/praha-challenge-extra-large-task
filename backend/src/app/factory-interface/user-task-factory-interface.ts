import { UserTask } from 'src/domain/entity/user-task'
import { Status } from 'src/domain/entity/sintyoku-status'

type InsertUserTaskParams = {
  kind: 'Insert'
  userId: string
  taskId: string
}

type UpdateUserTaskParams = {
  kind: 'Update'
  id: string
  status: Status
}

export type UserTaskParams = InsertUserTaskParams | UpdateUserTaskParams

export interface IUserTaskFactory {
  create(params: UserTaskParams): Promise<UserTask>
}
