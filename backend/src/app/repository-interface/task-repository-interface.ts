import { Task } from 'src/domain/entity/task'

export interface ITaskRepository {
  save(task: Task): Promise<Task>
  delete(id: string): Promise<Task>
  find(id: string): Promise<Task>
}
