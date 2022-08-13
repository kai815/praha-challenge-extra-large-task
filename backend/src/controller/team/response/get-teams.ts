import { ApiProperty } from '@nestjs/swagger'
import { TeamDTO } from 'src/app/query-service-interface/team-qs'

export class GetTeamDataResponse {
  @ApiProperty({ type: () => [TeamDTO] })
  teamData: TeamDTO[]

  public constructor(params: { teamData: TeamDTO[] }) {
    const { teamData } = params
    this.teamData = teamData.map(({ id, name }) => {
      return new Team({
        id,
        name,
        // pairs,
      })
    })
  }
}

class Team {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  // @ApiProperty()
  // pairs: string[]

  public constructor(params: { id: string; name: string }) {
    this.id = params.id
    this.name = params.name
    // this.pairs = params.pairs
  }
}
