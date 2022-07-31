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
          pair.getAllProperties().members.map(async (member) => {
            const savedMamber = await this.prismaClient.pairMember.upsert({
              where: {
                id: member.getAllProperties().id,
              },
              create: {
                id: member.getAllProperties().id,
                pairId: pair.getAllProperties().id,
                userId: member.getAllProperties().userId,
              },
              update: {
                pairId: pair.getAllProperties().id,
                userId: member.getAllProperties().userId,
              },
            })
            return new Member({
              id: savedMamber.id,
              pairId: savedMamber.pairId,
              userId: savedMamber.userId,
            })
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

  public async getLastTeamName(): Promise<string | null> {
    const gettedTeam = await this.prismaClient.team.findFirst({
      orderBy: { name: 'desc' },
      select: {
        name: true,
      },
    })
    if (!gettedTeam) {
      return null
    }
    return gettedTeam.name
  }
  //repositoryで一番メンバー少ないのを取りたいがprismaでの書き方がわからないので一旦保留
  public async getMinimumMemberTeam(): Promise<Team | null> {
    const gettedTeam = await this.prismaClient.team.findMany({
      include: {
        TeamPair: {
          include: {
            pair: {
              include: {
                PairMember: true,
                _count: {
                  select: { PairMember: true },
                },
              },
            },
          },
        },
      },
      //TODOのPairMemberでのorderbyのやり方
    })
    return null
  }

  public async getAllTeam(): Promise<Team[]> {
    const gettedTeam = await this.prismaClient.team.findMany({
      include: {
        TeamPair: {
          include: {
            pair: {
              include: {
                PairMember: true,
              },
            },
          },
        },
      },
    })
    const allTeamEntity = gettedTeam.map((team) => {
      const pairs = team.TeamPair.map((teamPair) => {
        const members = teamPair.pair.PairMember.map((pairMember) => {
          return new Member({
            id: pairMember.id,
            pairId: pairMember.pairId,
            userId: pairMember.userId,
          })
        })
        return new Pair({
          id: teamPair.pairId,
          name: teamPair.pair.name,
          members: members,
          teamPairId: teamPair.id,
        })
      })
      return new Team({ id: team.id, name: team.name, pairs: pairs })
    })
    return allTeamEntity
  }
  public async findTeamByUser(userId: string): Promise<Team> {
    const gettedTeam = await this.prismaClient.team.findFirst({
      include: {
        TeamPair: {
          include: {
            pair: {
              include: {
                PairMember: {
                  where: { userId },
                },
              },
            },
          },
        },
      },
    })
    if (!gettedTeam) {
      throw new Error('所属するチームが見つかりませんでした')
    }
    const pairs = gettedTeam.TeamPair.map((teamPair) => {
      const members = teamPair.pair.PairMember.map((pairMember) => {
        return new Member({
          id: pairMember.id,
          pairId: pairMember.pairId,
          userId: pairMember.userId,
        })
      })
      return new Pair({
        id: teamPair.pairId,
        name: teamPair.pair.name,
        members: members,
        teamPairId: teamPair.id,
      })
    })
    return new Team({ id: gettedTeam.id, name: gettedTeam.name, pairs })
  }
  public async deleteMember(member: Member) {
    await this.prismaClient.pairMember.delete({
      where: {
        id: member.getAllProperties().id,
      },
    })
  }
}
