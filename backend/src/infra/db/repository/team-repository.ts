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
    // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes
    this.prismaClient.team.upsert({
      where: { id },
      create: {
        id,
        name,
        TeamPair: {
          create: pairs.map((pair) => {
            return {
              //idをちゃんとする
              id: '',
              teamId: id,
              pairId: pair.getAllProperties().id,
              pair: {
                create: {
                  id: pair.getAllProperties().id,
                  name: pair.getAllProperties().name,
                },
              },
            }
          }),
        },
      },
      update: {
        name,
        //TODOupdateの条件考える
        TeamPair: {
          create: pairs.map((pair) => {
            return {
              //idをちゃんとする
              id: '',
              teamId: id,
              pairId: pair.getAllProperties().id,
              pair: {
                update: {
                  id: pair.getAllProperties().id,
                  name: pair.getAllProperties().name,
                },
              },
            }
          }),
        },
      },
    })
  }
}
