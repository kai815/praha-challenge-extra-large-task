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
}
