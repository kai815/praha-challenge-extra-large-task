import { PrismaClient } from '@prisma/client'
import {
  TeamDTO,
  PairDTO,
  MemberDTO,
  ITeamQS,
} from 'src/app/query-service-interface/team-qs'

export class TeamQS implements ITeamQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<TeamDTO[]> {
    const allTeam = await this.prismaClient.team.findMany({
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
    return allTeam.map((team) => {
      const pairs = team.TeamPair.map((teamPair) => {
        const members = teamPair.pair.PairMember.map((pairMember) => {
          return new MemberDTO({
            userId: pairMember.userId,
          })
        })
        return new PairDTO({
          id: teamPair.pairId,
          name: teamPair.pair.name,
          members: members,
        })
      })
      return new TeamDTO({ id: team.id, name: team.name, pairs: pairs })
    })
  }
}
