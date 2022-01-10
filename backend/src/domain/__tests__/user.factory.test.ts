import { User } from 'src/domain/entity/user'
import { UserFactory } from 'src/domain/factory/user.factory'
import { Status } from 'src/domain/entity/zaiseki-status'
import { UserRepository } from 'src/infra/db/repository/user-repository'

//mock
jest.mock('src/infra/db/repository/user-repository') // パスを指定
const UserRepoMock = UserRepository as jest.Mock

UserRepoMock.mockImplementationOnce(() => {
  return {
    find: async (id: string) => {
      if (id !== 'test') {
        throw new Error('ユーザは見つかりませんでした。')
      }
      const params = {
        id,
        name: '山田太郎',
        email: 'test@test.com',
        status: 'Inmembership' as Status,
      }
      return new User(params)
    },
  }
})

describe('user.factory.test', () => {
  describe('create', () => {
    it('[正常系]引数のidがある時は、repogitoryでfindした値とparamsの値がマージされてUserのインスタンスが作成される', async () => {
      const testParams = {
        id: 'test',
        name: '山田二郎',
        email: 'jiro@test.com',
      }
      const userExpected = {
        ...testParams,
        status: 'Inmembership' as Status,
      }
      const userFac = new UserFactory(new UserRepoMock())
      const user = await userFac.create(testParams)
      expect(user.getAllProperties()).toEqual(userExpected)
    })
    it('[正常系]引数のidがない時はidはuuidが生成されて、nameやemailは引数の値で、statusはInmembership', async () => {
      const testParams = {
        name: '山田太郎',
        email: 'test@test.com',
      }
      const userFac = new UserFactory(new UserRepoMock())
      const user = await userFac.create(testParams)
      expect(user.getAllProperties().id.length).toBeGreaterThan(0)
      expect(user.getAllProperties().name).toEqual(testParams.name)
      expect(user.getAllProperties().email).toEqual(testParams.email)
      expect(user.getAllProperties().status).toEqual('Inmembership')
    })
  })
})
