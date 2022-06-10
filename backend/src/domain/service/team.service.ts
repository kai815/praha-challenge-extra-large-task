import { ITeamRepository } from 'src/app/repository-interface/team-repository-interface'

export class TeamService {
  private teamRepo: ITeamRepository
  public constructor(teamRepo: ITeamRepository) {
    this.teamRepo = teamRepo
  }
  //数字順でつけられるチーム名の次のやつを取得
  public async getNewTeamName() {
    const lastTeamName = await this.teamRepo.getTeamNameByNameLast()
    const newTeamName = lastTeamName
      ? (Number(lastTeamName) + 1).toString()
      : '1'
    return newTeamName
  }
}
