import { UserTask } from 'src/domain/entity/user-task'
import { Status } from 'src/domain/entity/sintyoku-status'
import { createRandomIdString } from 'src/util/random'

describe('user-task.entity.test', () => {
  describe('getAllProperties', () => {
    it('[正常系]作成したインスタンスのプロパティが全て取れる', () => {
      const userTaskExpected = {
        id: createRandomIdString(),
        status: 'NotStarted' as Status,
        userId: createRandomIdString(),
        taskId: createRandomIdString(),
      }
      const userTask = new UserTask(userTaskExpected)
      expect(userTask.getAllProperties()).toEqual(userTaskExpected)
    })
  })
})
