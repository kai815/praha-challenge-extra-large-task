import { Task } from 'src/domain/entity/Task'

//TODO idがなかったらtitleなどは必須という型にできるならしたい
export type TaskParams = {
  id?: string
  title?: string
  reason?: string
  description?: string
}

export interface ITaskFactory {
  create(params: TaskParams): Promise<Task>
}
