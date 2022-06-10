import { PrismaClient } from '@prisma/client'
import { ITeamRepository } from 'src/app/repository-interface/team-repository-interface'
import { Team, Member, Pair } from 'src/domain/entity/team'

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

    const savedTeam = await this.prismaClient.team.upsert({
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
    const savedPairList = await Promise.all(
      pairs.map(async (pair) => {
        const savedTeamPair = await this.prismaClient.teamPair.upsert({
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
        const savedPair = await this.prismaClient.pair.upsert({
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
        //pairMemberテーブルの更新
        const savedMamberList = await Promise.all(
          pair.members.map(async (member) => {
            const savedMamber = await this.prismaClient.pairMember.upsert({
              where: {
                id: member.getAllProperties().id,
              },
              create: {
                id: member.getAllProperties().id,
                pairId: pair.getAllProperties().id,
                userId: member.getAllProperties().id,
              },
              update: {
                pairId: pair.getAllProperties().id,
                userId: member.getAllProperties().id,
              },
            })
            return new Member({ id: savedMamber.id })
          }),
        )
        return new Pair({
          id: savedPair.id,
          name: savedPair.name,
          members: savedMamberList,
          teamPairId: savedTeamPair.id,
        })
      }),
    )
    return new Team({
      id: savedTeam.id,
      name: savedTeam.name,
      pairs: savedPairList,
    })
  }

  public async getByNameLast(): Promise<Team> {
    const gettedTeam = await this.prismaClient.team.findFirst({
      orderBy: { name: 'desc' },
      include: {
        TeamPair: { include: { pair: { include: { PairMember: true } } } },
      },
    })
    if (!gettedTeam) {
      throw new Error('チームは見つかりませんでした。')
    }
    const pairsEntity = gettedTeam.TeamPair.map((teamPair) => {
      const membersEntity = teamPair.pair.PairMember.map((pairMember) => {
        return new Member({ id: pairMember.id })
      })
      return new Pair({
        id: teamPair.pair.id,
        name: teamPair.pair.name,
        teamPairId: teamPair.id,
        members: membersEntity,
      })
    })
    return new Team({
      id: gettedTeam.id,
      name: gettedTeam.name,
      pairs: pairsEntity,
    })
  }
}
