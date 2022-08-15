import { ApiProperty } from '@nestjs/swagger'
import { TeamDTO, PairDTO } from 'src/app/query-service-interface/team-qs'

export class GetTeamDataResponse {
  @ApiProperty({ type: () => [Team] })
  teamData: Team[]

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

  //TODOSwaggerへの反映
  // 試したhttps://qiita.com/teracy164/items/d5ca300a8db93ba2a7e2
  @ApiProperty({ type: () => [PairDTO] })
  pairs: PairDTO[]

  public constructor(params: { id: string; name: string; pairs: PairDTO[] }) {
    this.id = params.id
    this.name = params.name
    this.pairs = params.pairs
  }
}
