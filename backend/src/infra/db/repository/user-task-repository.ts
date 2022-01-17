import { PrismaClient } from '@prisma/client'
import { IUserTaskRepository } from 'src/app/repository-interface/user-task-repository-interface'
import { UserTask } from 'src/domain/entity/user-task'

export class UserTaskRepository implements IUserTaskRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }
  public async save(userTaskEntity: UserTask): Promise<UserTask> {
    const {
      id,
      status,
      userId,
      taskId,
    } = await userTaskEntity.getAllProperties()

    const savedUserTaskModel = await this.prismaClient.userTask.upsert({
      where: {
        id,
      },
      create: {
        id,
        status,
        userId,
        taskId,
      },
      update: {
        status,
      },
    })
    const savedUserTaskEntity = new UserTask({ ...savedUserTaskModel })
    return savedUserTaskEntity
  }
  public async find(id: string): Promise<UserTask> {
    const findedUserTaskModel = await this.prismaClient.userTask.findFirst({
      where: {
        id,
      },
    })
    if (!findedUserTaskModel) {
      throw new Error('ユーザータスクは見つかりませんでした。')
    }
    const findedUserTaskEntity = new UserTask({ ...findedUserTaskModel })
    return findedUserTaskEntity
  }
}
