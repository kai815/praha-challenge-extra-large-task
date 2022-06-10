import { Team } from 'src/domain/entity/Team'

export interface ITeamRepository {
  save(team: Team): Promise<Team>
  getByNameLast(): Promise<Team>
}
