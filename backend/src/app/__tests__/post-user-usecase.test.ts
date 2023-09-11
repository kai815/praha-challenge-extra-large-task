import { PrismaClient } from '@prisma/client'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { UserFactory } from 'src/domain/factory/user.factory'
import { UserTaskRepository } from 'src/infra/db/repository/user-task-repository'
import { UserTaskFactory } from 'src/domain/factory/user-task.factory'
import { TaskQS } from 'src/infra/db/query-service/task-qs'
import { PostUserUseCase } from '../post-user-usecase'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { TeamService } from 'src/domain/service/team.service'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/user-repository')
jest.mock('src/domain/factory/user.factory')
jest.mock('src/infra/db/repository/user-task-repository')
jest.mock('src/domain/factory/user-task.factory')
jest.mock('src/infra/db/query-service/task-qs')
jest.mock('src/infra/db/query-service/team-qs')
jest.mock('src/domain/service/team.service')

describe('do', () => {
  let mockUserRepo: MockedObjectDeep<UserRepository>
  let mockUserFac: MockedObjectDeep<UserFactory>
  let mocktaskQS: MockedObjectDeep<TaskQS>
  let mockUserTaskRepo: MockedObjectDeep<UserTaskRepository>
  let mockUserTaskFac: MockedObjectDeep<UserTaskFactory>
  let mockTeamRepo: MockedObjectDeep<TeamRepository>
  let mockTeamService: MockedObjectDeep<TeamService>
  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserRepo = mocked(new UserRepository(prisma), true)
    mockUserFac = mocked(new UserFactory(mockUserRepo), true)
    mocktaskQS = mocked(new TaskQS(prisma), true)
    mockUserTaskRepo = mocked(new UserTaskRepository(prisma), true)
    mockUserTaskFac = mocked(new UserTaskFactory(mockUserTaskRepo), true)
    mockTeamRepo = mocked(new TeamRepository(prisma), true)
    mockTeamService = mocked(new TeamService(mockTeamRepo), true)
  })
  it('[正常系]: 例外が発生しない', async () => {
    // TODO後で直す
    // const usecase = new PostUserUseCase(
    //   mockUserRepo,
    //   mockUserFac,
    //   mocktaskQS,
    //   mockUserTaskRepo,
    //   mockUserTaskFac,
    //   mockTeamRepo,
    //   mockTeamService,
    // )
    // return expect(
    //   usecase.do({
    //     name: '山田太郎',
    //     email: 'test@test.com',
    //   }),
    // ).resolves.toBe(undefined)
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
      mockTeamRepo,
      mockTeamService,
    )
    return expect(
      usecase.do({
        name: '山田太郎',
        email: 'test@test.com',
      }),
    ).rejects.toEqual(ERROR_MESSAGE)
  })
})
