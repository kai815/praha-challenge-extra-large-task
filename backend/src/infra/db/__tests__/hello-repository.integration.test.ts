import { Hello } from 'src/domain/sample/entity/hello'
import { seedUser } from 'src/../testUtil/user-factory'
import { prisma } from '../../../../testUtil/prisma'
import { HelloRepository } from '../repository/sample/hello-repository'

const EXISTING_USERS: { id: string; email: string }[] = [
  {
    id: '1',
    email: 'hoge@example.com',
  },
  {
    id: '2',
    email: 'fuga@example.com',
  },
]

describe('test', () => {
  let helloRepo: HelloRepository
  beforeAll(async () => {
    helloRepo = new HelloRepository(prisma)
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  describe('save', () => {
    beforeAll(async () => {
      for (const user of EXISTING_USERS) {
        await seedUser({ id: user.id, email: user.email })
      }
    })
    afterEach(async () => {
      await prisma.user.deleteMany({})
      await prisma.hello.deleteMany({})
    })
    it('[正常系]helloを保存して、存在するuserと紐づけられる', async () => {
      await helloRepo.save(
        new Hello({
          id: '1', // fixme: 他のテストに依存しないよう、ランダムな値にする
          hello: 'hello',
          required: false,
          number: 1,
          userIds: EXISTING_USERS.map((user) => user.id),
        }),
      )

      const allHellos = await prisma.hello.findMany({
        include: {
          users: true,
        },
      })

      expect(allHellos).toHaveLength(1)
      expect(allHellos[0]?.users).toHaveLength(2)
      expect(allHellos[0]?.users.map((user) => user.id)).toEqual(
        EXISTING_USERS.map((user) => user.id),
      )
    })
    it('[異常系]存在しないユーザとの紐付けを試みた場合、例外が生じる', async () => {
      // memo: エラーを生じさせたくない場合どうすれば良いのだろう？と気になって調べたけど、現状exception messageを見るしかないらしい
      // https://github.com/prisma/prisma/discussions/4552
      await expect(
        helloRepo.save(
          new Hello({
            id: '2', // fixme: 他のテストに依存しないよう、ランダムな値にする
            hello: 'hello',
            required: false,
            number: 1,
            userIds: ['3'],
          }),
        ),
      ).rejects.toEqual(expect.any(Error))
    })
  })
})
