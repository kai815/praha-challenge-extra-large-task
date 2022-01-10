import { PrismaClient } from '@prisma/client'
import { ITaskRepository } from 'src/app/repository-interface/task-repository-interface'
import { Task } from 'src/domain/entity/task'

export class TaskRepository implements ITaskRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }
  public async save(taskEntity: Task): Promise<Task> {
    const { id, title, reason, description } = taskEntity.getAllProperties()
    const savedTask = await this.prismaClient.task.upsert({
      where: {
        id,
      },
      create: {
        id,
        title,
        reason,
        description,
      },
      update: {
        title,
        reason,
        description,
      },
    })
    const savedTaskEntity = new Task({ ...savedTask })
    return savedTaskEntity
  }
  public async delete(id: string): Promise<Task> {
    const deletedTask = await this.prismaClient.task.delete({
      where: { id },
    })
    const deletedTaskEntity = new Task({ ...deletedTask })
    return deletedTaskEntity
  }

  public async find(id: string): Promise<Task> {
    const findedTask = await this.prismaClient.task.findFirst({
      where: { id },
    })
    if (!findedTask) {
      throw new Error('課題は見つかりませんでした。')
    }
    const findedTaskEntity = new Task({ ...findedTask })
    return findedTaskEntity
  }
}
