import { Status } from 'src/domain/entity/zaiseki-status'
import { IUserRepository } from './repository-interface/user-repository-interface'
import { IUserFactory } from './factory-interface/user-factory-interface'
import { ITeamRepository } from 'src/app/repository-interface/team-repository-interface'

export class UpdateUserUseCase {
  private readonly userRepo: IUserRepository
  private readonly userFac: IUserFactory
  private readonly teamRepo: ITeamRepository
  //TODOテストのしやすさを考えてteamもDIしたがいいのか
  public constructor(
    userRepo: IUserRepository,
    userFac: IUserFactory,
    teamRepo: ITeamRepository,
  ) {
    this.userRepo = userRepo
    this.userFac = userFac
    this.teamRepo = teamRepo
  }
  public async do(params: {
    id: string
    name?: string
    email?: string
    status?: Status
  }) {
    const userEntity = await this.userFac.create(params)
    await this.userRepo.save(userEntity)
    //退会か休会の場合はチームやペアの組み替えが発生する
    if (params.status === 'Inactive' || params.status === 'Withdrawn') {
      const updatedUserId = userEntity.getAllProperties().id
      const belongedTeam = await this.teamRepo.findTeamByUser(updatedUserId)
      //チーム内での移動で収まる場合
      if (belongedTeam.isEnableDecreaseWithinTeam(updatedUserId)) {
        const deletingMember = belongedTeam.getMemberByUserId(updatedUserId)
        belongedTeam.decreaseTeamMember(updatedUserId)
        await this.teamRepo.save(belongedTeam)
        if (!deletingMember) {
          throw Error('deletingMemberが見つかりませんでした')
        }
        // teamemberテーブルのデータを削除
        await this.teamRepo.deleteMember(deletingMember)
      }
    }
  }
}
