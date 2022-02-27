import { ITeamRepository } from 'src/app/repository-interface/team-repository-interface'

export class TeamService {
  private teamRepo: ITeamRepository
  public constructor(teamRepo: ITeamRepository) {
    this.teamRepo = teamRepo
  }
}
