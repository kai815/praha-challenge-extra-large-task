import { ITeamQS } from 'src/app/query-service-interface/team-qs'
export class GetTeamUseCase {
  private readonly teamQS: ITeamQS
  public constructor(teamQS: ITeamQS) {
    this.teamQS = teamQS
  }
  public async do() {
    try {
      return await this.teamQS.getAll()
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
