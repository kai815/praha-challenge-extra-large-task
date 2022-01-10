import { ApiProperty } from '@nestjs/swagger'
import { TaskDTO } from 'src/app/query-service-interface/task-qs'

export class GetTaskResponse {
  @ApiProperty({ type: () => [Task] })
  tasks: Task[]

  public constructor(params: { tasks: TaskDTO[] }) {
    const { tasks } = params
    this.tasks = tasks.map(({ id, title, reason, description }) => {
      return new Task({
        id,
        title,
        reason,
        description,
      })
    })
  }
}

class Task {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  reason: string

  @ApiProperty()
  description: string

  public constructor(params: {
    id: string
    title: string
    reason: string
    description: string
  }) {
    this.id = params.id
    this.title = params.title
    this.reason = params.reason
    this.description = params.description
  }
}
