import { PrismaClient } from '@prisma/client'
import { IUserRepository } from 'src/app/repository-interface/user-repository-interface'
import { User } from 'src/domain/entity/user'

export class UserRepository implements IUserRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }
  public async save(userEntity: User): Promise<User> {
    const { id, name, email, status } = userEntity.getAllProperties()

    const savedUserModel = await this.prismaClient.user.upsert({
      where: {
        id,
      },
      create: {
        id,
        name,
        email,
        status,
      },
      update: {
        name,
        email,
        status,
      },
    })
    const savedUserEntity = new User({ ...savedUserModel })
    return savedUserEntity
  }
  public async delete(id: string): Promise<User> {
    const deletedUserModel = await this.prismaClient.user.delete({
      where: {
        id,
      },
    })
    const deletedUserEntity = new User({ ...deletedUserModel })
    return deletedUserEntity
  }
  public async find(id: string): Promise<User> {
    const findedUserModel = await this.prismaClient.user.findFirst({
      where: {
        id,
      },
    })
    if (!findedUserModel) {
      throw new Error('ユーザは見つかりませんでした。')
    }
    const findedUserEntity = new User({ ...findedUserModel })
    return findedUserEntity
  }
}
