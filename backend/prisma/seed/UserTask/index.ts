import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

export async function userTaskSeed(prisma: PrismaClient) {
  const users = await prisma.user.findMany()
  const tasks = await prisma.task.findMany()

  //usertaskテーブルのデータ作成
  for (const user of users) {
    for (const task of tasks) {
      //taskを1つ1つ取り出して、userに紐付ける
      const userTask = {
        id: faker.random.uuid(),
        userId: user.id,
        taskId: task.id,
      }
      const createdUserTask = await prisma.userTask.create({
        data: {
          status: 'NotStarted',
          ...userTask,
        },
      })
      console.log({ createdUserTask })
    }
  }
}
