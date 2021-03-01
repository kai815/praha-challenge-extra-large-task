import { prisma } from '../../../../../testUtil/prisma'

describe('prisma test', () => {
  afterAll(async () => {
    prisma.$disconnect()
  })
  describe('basic crud', () => {
    afterEach(async () => {
      await prisma.user.deleteMany()
      await prisma.post.deleteMany()
    })
    it('add to DB', async () => {
      await prisma.user.create({
        data: {
          id: '1',
          email: 'createdformtest',
        },
      })
      const allUsers = await prisma.user.findMany()
      expect(allUsers).toHaveLength(1)
    })
    it('get from DB', async () => {
      const allUsers = await prisma.user.findMany()
      expect(allUsers).toHaveLength(0)
    })
  })
  describe('transaction', () => {
    it('トランザクション処理中に問題が発生したらロールバックされる', async () => {
      try {
        await prisma.user.create({
          data: {
            id: '1',
            email: 'hogefuga@example.com',
            posts: {
              create: [
                { id: '1', title: 'prisma' },
                { id: '1', title: 'prisma2' }, // id重複により失敗する
              ],
            },
          },
        })
        throw new Error('should throw')
      } catch (error) {
        const allPosts = await prisma.post.findMany()
        expect(allPosts).toHaveLength(0)
      }
    })
    it('複数処理を同一トランザクションで実行できる', async () => {
      const post1 = prisma.post.create({ data: { id: '1', title: 'hoge' } })
      const post2 = prisma.post.create({ data: { id: '1', title: 'hoge' } }) // id重複により失敗する
      try {
        await prisma.$transaction([post1, post2])
        throw new Error('should throw')
      } catch (error) {
        const allPosts = await prisma.post.findMany()
        expect(allPosts).toHaveLength(0)
      }
    })
  })
})
