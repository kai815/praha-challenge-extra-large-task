import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

export async function teamSeed(prisma: PrismaClient) {
  const team1 = {
    id: faker.random.uuid(),
    name: '1',
  }

  const team2 = {
    id: faker.random.uuid(),
    name: '2',
  }

  //teamテーブルのデータ作成
  await prisma.team.create({ data: team1 })
  await prisma.team.create({ data: team2 })
}
