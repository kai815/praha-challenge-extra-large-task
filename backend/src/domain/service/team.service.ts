import { ITeamRepository } from 'src/app/repository-interface/team-repository-interface'
import { Team } from 'src/domain/entity/team'

export class TeamService {
  private teamRepo: ITeamRepository
  public constructor(teamRepo: ITeamRepository) {
    this.teamRepo = teamRepo
  }
  //数字順でつけられるチーム名の次のやつを取得
  public async getNewTeamName() {
    const lastTeamName = await this.teamRepo.getLastTeamName()
    const newTeamName = lastTeamName
      ? (Number(lastTeamName) + 1).toString()
      : '1'
    return newTeamName
  }
  //一番メンバー数が少ないチームを返す(本当はrepoでやりたい)
  public async getMinimumMemberTeam(): Promise<Team | null> {
    const allTeams = await this.teamRepo.getAllTeam()
    const minimumMemberTeam = allTeams.reduce((previousValue, currentValue) =>
      //同じの場合はpreviousを大きいとする
      previousValue.getTeamMemberCount > currentValue.getTeamMemberCount
        ? previousValue
        : currentValue,
    )
    return minimumMemberTeam
  }
}
