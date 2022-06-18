import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

export async function taskSeed(prisma: PrismaClient) {
  await prisma.task.deleteMany()
  await prisma.userTask.deleteMany()
  const users = await prisma.user.findMany()

  const task1 = {
    id: faker.random.uuid(),
    title: 'DDDを学ぶ',
    reason: 'アプリケーションの設計・保守性について考える力を養うため。',
    description: 'DDDについて、ペアに説明してみましょう。',
  }

  const task2 = {
    id: faker.random.uuid(),
    title: 'フロントエンドを学ぶ',
    reason: 'アプリケーションのフロントの実装力を養うため。',
    description: 'フロントエンドの課題について、ペアに説明しましょう。',
  }

  //taskテーブルのデータ作成
  const createdTask1 = await prisma.task.create({ data: task1 })
  const createdTask2 = await prisma.task.create({ data: task2 })

  //usertaskテーブルのデータ作成
  for (const user of users) {
    //task1
    const create1 = {
      id: faker.random.uuid(),
      userId: user.id,
      taskId: createdTask1.id,
    }
    const userTaskCreated1 = await prisma.userTask.create({
      data: {
        status: 'NotStarted',
        ...create1,
      },
    })
    console.log({ userTaskCreated1 })
    //task2
    const create2 = {
      id: faker.random.uuid(),
      userId: user.id,
      taskId: createdTask2.id,
    }
    const userTaskCreated2 = await prisma.userTask.create({
      data: {
        status: 'NotStarted',
        ...create2,
      },
    })
    console.log({ userTaskCreated2 })
  }
}
