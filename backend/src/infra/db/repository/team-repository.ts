import { PrismaClient } from '@prisma/client'
import { ITeamRepository } from 'src/app/repository-interface/team-repository-interface'
import { Team } from 'src/domain/entity/team'

export class TeamRepository implements ITeamRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }
  public async save(teamEntity: Team): Promise<Team> {
    const { id, name, pairs } = teamEntity.getAllProperties()
    //ネストしたcreateなどは出来そうだが、updateは出来ないので、1つずつのテーブルで行う
    // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes
    //teamテーブルに対するupsert

    this.prismaClient.team.upsert({
      where: { id },
      create: {
        id,
        name,
      },
      update: {
        name,
      },
    })

    //teamPairテーブルとpairテーブル、 pairMemberテーブルに対するupsert
    pairs.map(async (pair) => {
      await this.prismaClient.teamPair.upsert({
        where: {
          id: pair.getAllProperties().teamPairId,
        },
        create: {
          id: pair.getAllProperties().teamPairId,
          teamId: id,
          pairId: pair.getAllProperties().id,
        },
        update: {
          teamId: id,
          pairId: pair.getAllProperties().id,
        },
      })
      await this.prismaClient.pair.upsert({
        where: {
          id: pair.getAllProperties().id,
        },
        create: {
          id: pair.getAllProperties().id,
          name: pair.getAllProperties().name,
        },
        update: {
          name: pair.getAllProperties().name,
        },
      })
      //TODO pairMemberテーブルの更新
    })
  }
}
