import { ApiProperty } from '@nestjs/swagger'
import { TeamDTO, PairDTO } from 'src/app/query-service-interface/team-qs'

export class GetTeamDataResponse {
  @ApiProperty({ type: () => [TeamDTO] })
  teamData: TeamDTO[]

  public constructor(params: { teamData: TeamDTO[] }) {
    const { teamData } = params
    this.teamData = teamData.map(({ id, name, pairs }) => {
      return new Team({
        id,
        name,
        pairs,
      })
    })
  }
}

class Team {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  pairs: PairDTO[]

  public constructor(params: { id: string; name: string; pairs: PairDTO[] }) {
    this.id = params.id
    this.name = params.name
    this.pairs = params.pairs
  }
}
