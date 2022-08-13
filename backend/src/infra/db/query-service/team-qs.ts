import { PrismaClient } from '@prisma/client'
import { TeamDTO, ITeamQS } from 'src/app/query-service-interface/team-qs'

export class TeamQS implements ITeamQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<TeamDTO[]> {
    const allTeam = await this.prismaClient.team.findMany()
    return allTeam.map(
      (team) =>
        new TeamDTO({
          ...team,
        }),
    )
  }
}
