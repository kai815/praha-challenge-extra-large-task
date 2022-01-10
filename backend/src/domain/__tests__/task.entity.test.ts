import { Task } from 'src/domain/entity/task'
import { createRandomIdString } from 'src/util/random'

describe('task.entity.test', () => {
  describe('getAllProperties', () => {
    it('[正常系]作成したインスタンスのプロパティが全て取れる', () => {
      const taskExpected = {
        id: createRandomIdString(),
        title: 'DDDを学ぶ',
        reason: 'アプリケーションの設計・保守性について考える力を養うため。',
        description: 'DDDについて、ペアに説明してみましょう。',
      }
      const task = new Task(taskExpected)
      expect(task.getAllProperties()).toEqual(taskExpected)
    })
  })
})
