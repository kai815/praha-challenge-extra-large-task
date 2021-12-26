import { IUserRepository } from './repository-interface/user-repository-interface'

export class DeleteUserUseCase {
  private readonly userRepo: IUserRepository
  public constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo
  }
  public async do(params: { id: string }) {
    const { id } = params
    await this.userRepo.delete(id)
  }
}
