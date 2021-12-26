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

    const savedUserModel = await this.prismaClient.user.create({
      data: {
        id,
        name,
        email,
        status,
      },
    })
    const savedUserEntity = new User({ ...savedUserModel })
    return savedUserEntity
  }
  public async update(userEntity: User): Promise<User> {
    const { id, name, email, status } = userEntity.getAllProperties()

    const updatedUserModel = await this.prismaClient.user.update({
      data: {
        name,
        email,
        status,
      },
      where: {
        id,
      },
    })
    const updatedUserEntity = new User({ ...updatedUserModel })
    return updatedUserEntity
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
}
