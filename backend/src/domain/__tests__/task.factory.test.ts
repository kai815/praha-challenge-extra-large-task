import { Task } from 'src/domain/entity/Task'
import { TaskFactory } from 'src/domain/factory/task.factory'
import { TaskRepository } from 'src/infra/db/repository/task-repository'

//mock
jest.mock('src/infra/db/repository/task-repository') // パスを指定
const TaskRepoMock = TaskRepository as jest.Mock

//UserRepositoryのmock
TaskRepoMock.mockImplementationOnce(() => {
  return {
    find: async (id: string) => {
      if (id !== 'test') {
        throw new Error('課題は見つかりませんでした。')
      }
      const params = {
        id,
        title: 'DDDを学ぶ',
        reason: 'アプリケーションの設計・保守性について考える力を養うため。',
        description: 'DDDについて、ペアに説明してみましょう。',
      }
      return new Task(params)
    },
  }
})

describe('task.factory.test', () => {
  describe('create', () => {
    it('[正常系]引数のidがある時は、repogitoryでfindした値とparamsの値がマージされてTaskのインスタンスが作成される', async () => {
      const testParams = {
        id: 'test',
        title: 'DDDを学ぶテスト',
        reason:
          'アプリケーションの設計・保守性について考える力を養うため。テスト。',
      }
      const taskExpected = {
        ...testParams,
        description: 'DDDについて、ペアに説明してみましょう。',
      }
      const taskFac = new TaskFactory(new TaskRepoMock())
      const task = await taskFac.create(testParams)
      expect(task.getAllProperties()).toEqual(taskExpected)
    })
    it('[正常系]引数のidがない時はidはuuidが生成されて、titleなどは引数の値。', async () => {
      const testParams = {
        title: 'DDDを学ぶテスト',
        reason:
          'アプリケーションの設計・保守性について考える力を養うため。テスト。',
        description: 'DDDについて、ペアに説明してみましょう。テスト。',
      }
      const taskFac = new TaskFactory(new TaskRepoMock())
      const task = await taskFac.create(testParams)
      expect(task.getAllProperties().id.length).toBeGreaterThan(0)
      expect(task.getAllProperties().title).toEqual(testParams.title)
      expect(task.getAllProperties().reason).toEqual(testParams.reason)
      expect(task.getAllProperties().description).toEqual(
        testParams.description,
      )
    })
  })
})
