import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

export async function taskSeed(prisma: PrismaClient) {
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
  await prisma.task.create({ data: task1 })
  await prisma.task.create({ data: task2 })
}
