import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTeamDataResponse } from './response/get-teams'
import { GetTeamUseCase } from 'src/app/usecase/team/get-teams-usecase'
import { UpdateTeamUseCase } from 'src/app/usecase/team/update-team-usecase'
import { TeamQS } from 'src/infra/db/query-service/team-qs'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { PrismaClient } from '@prisma/client'
import { UpdateTeamRequest } from './request/update-task-request'

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

  @Post(':id')
  async postTeam(
    @Param('id') id: string,
    @Body() postTeamDto: UpdateTeamRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const teamRepo = new TeamRepository(prisma)
    const useCase = new UpdateTeamUseCase(teamRepo)
    await useCase.do({
      id,
      pairIds: postTeamDto.pairIds,
    })
  }
}
