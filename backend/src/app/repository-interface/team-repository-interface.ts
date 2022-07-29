import { Team } from 'src/domain/entity/Team'

export interface ITeamRepository {
  save(team: Team): Promise<Team>
  getLastTeamName(): Promise<string | null>
  getMinimumMemberTeam(): Promise<Team | null>
  getAllTeam(): Promise<Team[]>
  findTeamByUser(userId: string): Promise<Team>
}
