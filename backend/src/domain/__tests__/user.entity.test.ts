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
})
