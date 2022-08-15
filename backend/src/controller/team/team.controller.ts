import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTeamDataResponse } from './response/get-teams'
import { GetTeamUseCase } from 'src/app/usecase/team/get-teams-usecase'
import { TeamQS } from 'src/infra/db/query-service/team-qs'
import { PrismaClient } from '@prisma/client'

@Controller({
  path: '/teams',
})
export class TeamController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get()
  @ApiResponse({ status: 200, type: GetTeamDataResponse })
  async getTeams(): Promise<GetTeamDataResponse> {
    const prisma = new PrismaClient()
    const teamQS = new TeamQS(prisma)
    const usecase = new GetTeamUseCase(teamQS)
    const result = await usecase.do()
    const response = new GetTeamDataResponse({ teamData: result })
    return response
  }
}
