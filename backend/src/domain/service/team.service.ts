import { ITeamRepository } from 'src/app/repository-interface/team-repository-interface'

export class TeamService {
  private teamRepo: ITeamRepository
  public constructor(teamRepo: ITeamRepository) {
    this.teamRepo = teamRepo
  }
  //数字順でつけられるチーム名の次のやつを取得
  public async getNewTeamName() {
    const lastTeam = await this.teamRepo.getByNameLast()
    const newTeamName = (Number(lastTeam.name) + 1).toString()
    return newTeamName
  }
}
