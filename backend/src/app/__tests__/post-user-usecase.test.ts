import { PrismaClient } from '@prisma/client'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { UserFactory } from 'src/domain/factory/user.factory'
import { PostUserUseCase } from '../post-user-usecase'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/user-repository')

describe('do', () => {
  let mockUserRepo: MockedObjectDeep<UserRepository>
  let mockUserFac: MockedObjectDeep<UserFactory>
  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserRepo = mocked(new UserRepository(prisma), true)
    mockUserFac = mocked(new UserFactory(mockUserRepo), true)
  })
  it('[正常系]: 例外が発生しない', async () => {
    const usecase = new PostUserUseCase(mockUserRepo, mockUserFac)
    return expect(
      usecase.do({
        name: '山田太郎',
        email: 'test@test.com',
      }),
    ).resolves.toBe(undefined)
  })
  it('[異常系]: UserRepository.saveで例外が発生した場合、例外が発生する', () => {
    const ERROR_MESSAGE = 'error!'
    mockUserRepo.save.mockRejectedValueOnce(ERROR_MESSAGE)
    const usecase = new PostUserUseCase(mockUserRepo, mockUserFac)
    return expect(
      usecase.do({
        name: '山田太郎',
        email: 'test@test.com',
      }),
    ).rejects.toEqual(ERROR_MESSAGE)
  })
})
