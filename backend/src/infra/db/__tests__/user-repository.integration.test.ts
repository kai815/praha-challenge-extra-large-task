import { User } from 'src/domain/entity/user'
import { Status } from 'src/domain/entity/zaiseki-status'
import { createRandomIdString } from 'src/util/random'
import { prisma } from '@testUtil/prisma'
import { UserRepository } from '../repository/user-repository'

describe('user-repository.integration.ts', () => {
  const userRepo = new UserRepository(prisma)
  beforeAll(async () => {
    await prisma.user.deleteMany({})
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  describe('save', () => {
    afterEach(async () => {
      await prisma.user.deleteMany({})
    })
    it('[正常系]userを保存できる', async () => {
      const userExpected = {
        id: createRandomIdString(),
        name: '山田太郎',
        email: 'test@test.com',
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inmembership' as Status,
      }
      await userRepo.save(new User(userExpected))

      const allUsers = await prisma.user.findMany({})
      expect(allUsers).toHaveLength(1)
      expect(allUsers[0]).toEqual(userExpected)
    })
  })
  describe('update', () => {
    afterEach(async () => {
      await prisma.user.deleteMany({})
    })
    it('[正常系]userを更新できる', async () => {
      const creatingUser = {
        id: createRandomIdString(),
        name: '山田太郎',
        email: 'test@test.com',
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inmembership' as Status,
      }
      await userRepo.save(new User(creatingUser))

      const createUsers = await prisma.user.findMany({})
      const createdUser = createUsers[0]
      const id = createdUser?.id ?? ''
      const userExpected = {
        id: id,
        name: '山田二郎',
        email: 'jiro@test.com',
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inactive' as Status,
      }
      await userRepo.update(new User(userExpected))
      const allUsers = await prisma.user.findMany({})
      expect(allUsers).toHaveLength(1)
      expect(allUsers[0]).toEqual(userExpected)
    })
  })
})
