import { Task } from 'src/domain/entity/Task'

export interface ITaskRepository {
  save(task: Task): Promise<Task>
  delete(id: string): Promise<Task>
  find(id: string): Promise<Task>
}
