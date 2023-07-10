import { IAuthRepository } from 'src/app/repository-interface/auth-repository-interface'
import admin from 'firebase-admin'
import * as serviceAccount from '../../../../firebase-account.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})

export class AuthRepository implements IAuthRepository {
  //TODO外からDIした方がいいかもしれない
  public async verify(token: string): Promise<boolean> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token)
      if (decodedToken) {
        return true
      }
      return false
    } catch (err) {
      return false
    }
  }
}
