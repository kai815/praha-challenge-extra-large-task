import { PrismaClient } from '@prisma/client'
import {
  SomeDataDTO,
  ISomeDataQS,
} from 'src/app/sample/query-service-interface/some-data-qs'

export class SomeDataQS implements ISomeDataQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  // dockerでprismaのエラーが出るので、APIの動作確認としてprisma使わない形を試す
  public async getAll(): Promise<SomeDataDTO[]> {
    const allSomeDatas = [{ id: '1', required: true, number: 1 }]
    return allSomeDatas.map(
      (someDataDM) =>
        new SomeDataDTO({
          ...someDataDM,
        }),
    )
  }
}
