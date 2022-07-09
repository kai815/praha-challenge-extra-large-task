//書きたいこと
// ユーザーが増えた時にチーム・ペアメンバーに追加する
// 増えた時というのは、ユーザーが作成されたかユーザーが休会から復活した時
// もしくはチームやペアのメンバーが減ったことによって、ペアやチームが解散となり、他のチーム・ペアに移動する時

//増加時の処理の整理
//最も参加人数が少ないチームから自動的に選ばれる
//最も少ないチームを選ぶ処理はdomainサービスかrepogitoryに書く
//最も参加人数が少ないペアから自動的に選ばれる
//最も少ないペアを選ぶ処理はdomainサービスかrepogitoryに書く
//ペアが元々3名以上かどうか
//3名以上かどうかのチェックはdomainのentityに書く
//3名以上というか3名の場合
//ペアを分割する
//分割するのは、domainのentityかサービス
//3名未満の場合は
//ペアにメンバーを追加
//メンバーを追加するのは、domainのentityかな
//保存するのはrepogitory
import { ITeamRepository } from 'src/app/repository-interface/team-repository-interface'
import { TeamService } from 'src/domain/service/team.service'
export class IncreaseTeamMembeUseCase {
  private readonly teamRepo: ITeamRepository

  public constructor(teamRepo: ITeamRepository) {
    this.teamRepo = teamRepo
  }
  public async do(): Promise<void> {
    const teamService = new TeamService(this.teamRepo)
    //TODO teamServiceもdi？
    const minimumMemberTeam = await teamService.getMinimumMemberTeam()
  }
}
