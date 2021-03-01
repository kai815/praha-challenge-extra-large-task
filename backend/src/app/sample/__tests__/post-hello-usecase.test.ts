import { PrismaClient } from '@prisma/client'
import { HelloRepository } from 'src/infra/db/repository/sample/hello-repository'
import { PostHelloUseCase } from '../post-hello-usecase'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/sample/hello-repository')

describe('do', () => {
  let prisma: PrismaClient
  let mockHelloRepo: MockedObjectDeep<HelloRepository>
  beforeAll(() => {
    prisma = new PrismaClient()
    mockHelloRepo = mocked(new HelloRepository(prisma), true)
  })
  it('[正常系]: 例外が発生しない', async () => {
    const usecase = new PostHelloUseCase(mockHelloRepo)
    return expect(
      usecase.do({
        hello: 'hello',
        required: false,
        number: 1,
        userIds: ['1'],
      }),
    ).resolves.toBe(undefined)
  })
  it('[異常系]: helloRepo.saveで例外が発生した場合、例外が発生する', () => {
    const ERROR_MESSAGE = 'error!'
    mockHelloRepo.save.mockRejectedValueOnce(ERROR_MESSAGE)
    const usecase = new PostHelloUseCase(mockHelloRepo)
    return expect(
      usecase.do({
        hello: 'hello',
        required: false,
        number: 1,
        userIds: ['1'],
      }),
    ).rejects.toEqual(ERROR_MESSAGE)
  })
})
