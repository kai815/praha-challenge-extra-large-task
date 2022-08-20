import { ITeamRepository } from 'src/app/repository-interface/team-repository-interface'

export class UpdateTeamUseCase {
  private readonly teamRepo: ITeamRepository
  public constructor(teamRepo: ITeamRepository) {
    this.teamRepo = teamRepo
  }
  public async do(params: { id: string; pairIds: string[] }) {
    return
  }
}
