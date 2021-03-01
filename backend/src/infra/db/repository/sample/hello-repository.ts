import { PrismaClient } from '@prisma/client'
import { IHelloRepository } from 'src/app/sample/repository-interface/hello-repository'
import { Hello } from 'src/domain/sample/entity/hello'

export class HelloRepository implements IHelloRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async save(helloEntity: Hello): Promise<Hello> {
    const {
      id,
      hello,
      required,
      number,
      userIds,
    } = helloEntity.getAllProperties()

    const savedHelloDatamodel = await this.prismaClient.hello.create({
      data: {
        id,
        hello,
        required,
        number,
        users: {
          connect: userIds.map((userId) => ({
            id: userId,
          })),
        },
      },
      include: {
        users: true,
      },
    })
    const savedHelloEntity = new Hello({
      ...savedHelloDatamodel,
      userIds: savedHelloDatamodel.users.map((user) => user.id),
    })
    return savedHelloEntity
  }
}
