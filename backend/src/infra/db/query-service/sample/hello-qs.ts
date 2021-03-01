import { PrismaClient } from '@prisma/client'
import {
  HelloDTO,
  IHelloQS,
} from 'src/app/sample/query-service-interface/hello-qs'

export class HelloQS implements IHelloQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<HelloDTO[]> {
    const allHellos = await this.prismaClient.hello.findMany()
    return allHellos.map(
      (helloDM) =>
        new HelloDTO({
          ...helloDM,
        }),
    )
  }
}
