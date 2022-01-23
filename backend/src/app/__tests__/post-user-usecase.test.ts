import { PrismaClient } from '@prisma/client'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { UserFactory } from 'src/domain/factory/user.factory'
import { UserTaskRepository } from 'src/infra/db/repository/user-task-repository'
import { UserTaskFactory } from 'src/domain/factory/user-task.factory'
import { TaskQS } from 'src/infra/db/query-service/task-qs'
import { PostUserUseCase } from '../post-user-usecase'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/user-repository')
jest.mock('src/domain/factory/user.factory')
jest.mock('src/infra/db/repository/user-task-repository')
jest.mock('src/domain/factory/user-task.factory')
jest.mock('src/infra/db/query-service/task-qs')

describe('do', () => {
  let mockUserRepo: MockedObjectDeep<UserRepository>
  let mockUserFac: MockedObjectDeep<UserFactory>
  let mocktaskQS: MockedObjectDeep<TaskQS>
  let mockUserTaskRepo: MockedObjectDeep<UserTaskRepository>
  let mockUserTaskFac: MockedObjectDeep<UserTaskFactory>
  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserRepo = mocked(new UserRepository(prisma), true)
    mockUserFac = mocked(new UserFactory(mockUserRepo), true)
    mocktaskQS = mocked(new TaskQS(prisma), true)
    mockUserTaskRepo = mocked(new UserTaskRepository(prisma), true)
    mockUserTaskFac = mocked(new UserTaskFactory(mockUserTaskRepo), true)
  })
  it('[正常系]: 例外が発生しない', async () => {
    const usecase = new PostUserUseCase(
      mockUserRepo,
      mockUserFac,
      mocktaskQS,
      mockUserTaskRepo,
      mockUserTaskFac,
    )
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
    const usecase = new PostUserUseCase(
      mockUserRepo,
      mockUserFac,
      mocktaskQS,
      mockUserTaskRepo,
      mockUserTaskFac,
    )
    return expect(
      usecase.do({
        name: '山田太郎',
        email: 'test@test.com',
      }),
    ).rejects.toEqual(ERROR_MESSAGE)
  })
})
