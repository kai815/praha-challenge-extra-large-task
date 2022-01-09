import { User } from 'src/domain/entity/user'
import { Status } from 'src/domain/entity/zaiseki-status'
import { createRandomIdString } from 'src/util/random'

describe('user.entity.test', () => {
  describe('getAllProperties', () => {
    it('[正常系]作成したインスタンスのプロパティが全て取れる', () => {
      const userExpected = {
        id: createRandomIdString(),
        name: '山田太郎',
        email: 'test@test.com',
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inmembership' as Status,
      }
      const user = new User(userExpected)
      expect(user.getAllProperties()).toEqual(userExpected)
    })
  })
  describe('validateEmail', () => {
    it('[異常系]Emailとして正しくないものはエラーを吐く', () => {
      const invalidUser = {
        id: createRandomIdString(),
        name: '山田太郎',
        email: 'testtest.com',
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inmembership' as Status,
      }
      expect((): void => {
        new User(invalidUser)
      }).toThrow('Invalid Email')
    })
  })
})
