import { PrismaClient } from '@prisma/client'
import { UserDTO, IUsersQS } from 'src/app/query-service-interface/users-qs'

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
  public async search(): Promise<UserDTO[]> {
    const seachedUsers = await this.prismaClient.user.findMany({
      include: {
        UserTask: true,
      },
    })
    console.log('seachedUsers', seachedUsers)
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
