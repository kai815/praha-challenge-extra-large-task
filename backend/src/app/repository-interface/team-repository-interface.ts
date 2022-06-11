import { Team } from 'src/domain/entity/Team'

export interface ITeamRepository {
  save(team: Team): Promise<Team>
  getTeamNameByNameLast(): Promise<string | null>
  getMinimumMemberTeam(): Promise<Team | null>
  getAllTeam(): Promise<Team[]>
}
