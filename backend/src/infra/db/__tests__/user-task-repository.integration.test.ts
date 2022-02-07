import { UserTask } from 'src/domain/entity/user-task'
import { Status } from 'src/domain/entity/sintyoku-status'
import { User } from 'src/domain/entity/user'
import { Status as ZaisekiStatus } from 'src/domain/entity/zaiseki-status'
import { Task } from 'src/domain/entity/task'
import { createRandomIdString } from 'src/util/random'
import { prisma } from '@testUtil/prisma'
import { UserTaskRepository } from '../repository/user-task-repository'
import { UserRepository } from '../repository/user-repository'
import { TaskRepository } from '../repository/task-repository'
import { createUserTestData } from '../../../../testUtil/user-data-factory'

describe('user-task-repository.integration.ts', () => {
  const userTaskRepo = new UserTaskRepository(prisma)
  const userRepo = new UserRepository(prisma)
  const taskRepo = new TaskRepository(prisma)
  beforeAll(async () => {
    await prisma.userTask.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.task.deleteMany({})
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  describe('save', () => {
    afterEach(async () => {
      await prisma.userTask.deleteMany({})
      await prisma.user.deleteMany({})
      await prisma.task.deleteMany({})
    })
    it('[正常系]userTaskを保存できる', async () => {
      const randomUser = createUserTestData()
      const userExpected = {
        id: randomUser.id,
        name: randomUser.name,
        email: randomUser.email,
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inmembership' as ZaisekiStatus,
      }
      const taskExpected = {
        id: createRandomIdString(),
        title: 'DDDを学ぶ',
        reason: 'アプリケーションの設計・保守性について考える力を養うため。',
        description: 'DDDについて、ペアに説明してみましょう。',
      }
      await userRepo.save(new User(userExpected))
      await taskRepo.save(new Task(taskExpected))
      const userTaskExpected = {
        id: createRandomIdString(),
        status: 'NotStarted' as Status,
        userId: userExpected.id,
        taskId: taskExpected.id,
      }
      await userTaskRepo.save(new UserTask(userTaskExpected))
      const userTask = await prisma.userTask.findUnique({
        where: {
          id: userTaskExpected.id,
        },
      })
      expect(userTask).toEqual(userTaskExpected)
    })
    it('[正常系]userTaskを更新できる', async () => {
      const randomUser = createUserTestData()
      const userExpected = {
        id: randomUser.id,
        name: randomUser.name,
        email: randomUser.email,
        //TODOここasつけなきゃなのか深堀したい
        status: 'Inmembership' as ZaisekiStatus,
      }
      const taskExpected = {
        id: createRandomIdString(),
        title: 'DDDを学ぶ',
        reason: 'アプリケーションの設計・保守性について考える力を養うため。',
        description: 'DDDについて、ペアに説明してみましょう。',
      }
      await userRepo.save(new User(userExpected))
      await taskRepo.save(new Task(taskExpected))
      const createTaskExpected = {
        id: createRandomIdString(),
        status: 'NotStarted' as Status,
        userId: userExpected.id,
        taskId: taskExpected.id,
      }
      const userTaskExpected = {
        id: createTaskExpected?.id,
        status: 'InReview' as Status,
        userId: userExpected.id,
        taskId: taskExpected.id,
      }
      await userTaskRepo.save(new UserTask(createTaskExpected))
      await userTaskRepo.save(new UserTask(userTaskExpected))
      const userTask = await prisma.userTask.findUnique({
        where: {
          id: userTaskExpected.id,
        },
      })
      expect(userTask).toEqual(userTaskExpected)
    })
  })
})
