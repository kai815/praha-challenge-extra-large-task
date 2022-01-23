import { User } from 'src/domain/entity/user'
import { Status } from 'src/domain/entity/zaiseki-status'
import { prisma } from '@testUtil/prisma'
import { UserRepository } from '../repository/user-repository'
import { createUserTestData } from '../../../../testUtil/user-data-factory'

describe('user-repository.integration.ts', () => {
  const userRepo = new UserRepository(prisma)
  beforeAll(async () => {
    //TODOここのあたりでテストが落ちるので直すおそらくDBの関係
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
      const randomUser = createUserTestData()
      const userExpected = {
        id: randomUser.id,
        name: randomUser.name,
        email: randomUser.email,
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inmembership' as Status,
      }
      await userRepo.save(new User(userExpected))

      const user = await prisma.user.findUnique({
        where: {
          id: userExpected.id,
        },
      })
      expect(user).toEqual(userExpected)
    })
    it('[正常系]userを更新できる', async () => {
      const randomUser = createUserTestData()
      const creatingUser = {
        id: randomUser.id,
        name: randomUser.name,
        email: randomUser.email,
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inmembership' as Status,
      }
      await userRepo.save(new User(creatingUser))

      const createdUser = await prisma.user.findUnique({
        where: {
          id: creatingUser.id,
        },
      })
      const id = createdUser?.id ?? ''
      const userExpected = {
        id: id,
        name: '山田二郎',
        email: 'jiro@test.com',
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inactive' as Status,
      }
      await userRepo.save(new User(userExpected))
      const updatedUser = await prisma.user.findUnique({
        where: {
          id: userExpected.id,
        },
      })
      expect(updatedUser).toEqual(userExpected)
    })
  })
  describe('delete', () => {
    afterEach(async () => {
      await prisma.user.deleteMany({})
    })
    it('[正常系]userを削除できる', async () => {
      const randomUser = createUserTestData()
      const creatingUser = {
        id: randomUser.id,
        name: randomUser.name,
        email: randomUser.email,
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inmembership' as Status,
      }
      await userRepo.save(new User(creatingUser))
      await userRepo.delete(creatingUser.id)
      const deletedUser = await prisma.user.findUnique({
        where: { id: creatingUser.id },
      })
      expect(deletedUser).toEqual(null)
    })
  })
})
