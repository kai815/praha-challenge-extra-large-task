import { PrismaClient, TaskStatus } from '@prisma/client'
import {
  UserDTO,
  IUsersQS,
  SearchUserParams,
} from 'src/app/query-service-interface/users-qs'

export class UsersQS implements IUsersQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<UserDTO[]> {
    const allUsers = await this.prismaClient.user.findMany()
    return allUsers.map(
      (userDM) =>
        new UserDTO({
          ...userDM,
        }),
    )
  }
  public async search(params: SearchUserParams): Promise<UserDTO[]> {
    let seachedUsers
    if (
      typeof params.taskIds !== undefined &&
      typeof params.status !== undefined
    ) {
      const searchCondtions = params.taskIds?.map((taskId) => {
        return {
          UserTask: {
            every: { taskId: taskId, status: params.status },
          },
        }
      })
      //https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#relation-filters
      seachedUsers = await this.prismaClient.user.findMany({
        where: {
          OR: searchCondtions,
        },
      })
    } else {
      seachedUsers = await this.prismaClient.user.findMany({})
    }
    return seachedUsers.map((user) => {
      return new UserDTO({
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      })
    })
  }
}
