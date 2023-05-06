import { Team, Pair, Member } from 'src/domain/entity/team'

export interface ITeamRepository {
  save(team: Team): Promise<Team>
  getLastTeamName(): Promise<string | null>
  getMinimumMemberTeam(): Promise<Team | null>
  getAllTeam(): Promise<Team[]>
  findTeamByUser(userId: string): Promise<Team>
  deleteMember(member: Member): Promise<void>
}
