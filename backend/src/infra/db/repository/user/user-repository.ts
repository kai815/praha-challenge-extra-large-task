import { PrismaClient } from '@prisma/client'
import { User } from 'src/domain/user/entity/user'
import { IUserRepository } from 'src/app/user/repository-interface/user-repository'

export class UserRepository implements IUserRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async save(userEntitry: User): Promise<User> {
    const data = {
      id: userEntitry.id,
      email: userEntitry.email,
      fullname: userEntitry.fullname,
      age: userEntitry.age,
    }

    const savedUserDatamodel = await this.prismaClient.user.upsert({
      update: data,
      create: data,
      where: {
        id: userEntitry.id,
      },
    })

    const saveUserEntity = new User({
      id: savedUserDatamodel.id,
      email: savedUserDatamodel.email,
      fullname: savedUserDatamodel.fullname ?? undefined,
      age: savedUserDatamodel.age ?? undefined,
    })

    return saveUserEntity
  }
}
