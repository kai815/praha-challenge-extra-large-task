export interface IAuthRepository {
  verify(token: string): Promise<boolean>
}
