import { Task } from 'src/domain/entity/task'
import { createRandomIdString } from 'src/util/random'
import { prisma } from '@testUtil/prisma'
import { TaskRepository } from '../repository/task-repository'

describe('task-repository.integration.ts', () => {
  const taskRepo = new TaskRepository(prisma)
  beforeAll(async () => {
    await prisma.userTask.deleteMany({})
    await prisma.task.deleteMany({})
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  describe('save', () => {
    afterEach(async () => {
      await prisma.userTask.deleteMany({})
      await prisma.task.deleteMany({})
    })
    it('[正常系]taskを保存できる', async () => {
      const taskExpected = {
        id: createRandomIdString(),
        title: 'DDDを学ぶ',
        reason: 'アプリケーションの設計・保守性について考える力を養うため。',
        description: 'DDDについて、ペアに説明してみましょう。',
      }
      await taskRepo.save(new Task(taskExpected))

      const createdTask = await prisma.task.findUnique({
        where: {
          id: taskExpected.id,
        },
      })
      expect(createdTask).toEqual(taskExpected)
    })
    it('[正常系]taskを更新できる', async () => {
      const creatingTask = {
        id: createRandomIdString(),
        title: 'DDDを学ぶ',
        reason: 'アプリケーションの設計・保守性について考える力を養うため。',
        description: 'DDDについて、ペアに説明してみましょう。',
      }
      await taskRepo.save(new Task(creatingTask))

      const createdTask = await prisma.task.findUnique({
        where: {
          id: creatingTask.id,
        },
      })
      const id = createdTask?.id ?? ''
      const taskExpected = {
        id: id,
        title: 'DDDを学ぶ更新',
        reason:
          'アプリケーションの設計・保守性について考える力を養うため。テスト更新。',
        description: 'DDDについて、ペアに説明してみましょう。テスト更新。',
      }
      await taskRepo.save(new Task(taskExpected))
      const updatedTask = await prisma.task.findUnique({
        where: {
          id: taskExpected.id,
        },
      })
      expect(updatedTask).toEqual(taskExpected)
    })
  })
  describe('delete', () => {
    afterEach(async () => {
      await prisma.userTask.deleteMany({})
      await prisma.task.deleteMany({})
    })
    it('[正常系]taskを削除できる', async () => {
      const creatingTask = {
        id: createRandomIdString(),
        title: 'DDDを学ぶ',
        reason: 'アプリケーションの設計・保守性について考える力を養うため。',
        description: 'DDDについて、ペアに説明してみましょう。',
      }
      await taskRepo.save(new Task(creatingTask))
      await taskRepo.delete(creatingTask.id)
      const deletedTask = await prisma.task.findUnique({
        where: {
          id: creatingTask.id,
        },
      })
      expect(deletedTask).toEqual(null)
    })
  })
})
