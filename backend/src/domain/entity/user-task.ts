import { Status } from './sintyoku-status'

export class UserTask {
  private id: string
  public readonly status: Status
  public readonly userId: string
  public readonly taskId: string
  public constructor(props: {
    id: string
    status?: Status
    userId: string
    taskId: string
  }) {
    const { id, status, userId, taskId } = props
    this.id = id
    this.status = status ?? 'NotStarted'
    this.userId = userId
    this.taskId = taskId
  }
  public getAllProperties() {
    return {
      id: this.id,
      status: this.status,
      userId: this.userId,
      taskId: this.taskId,
    }
  }
}
