import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

export async function pairSeed(prisma: PrismaClient) {
  const pair1A = {
    id: faker.random.uuid(),
    name: 'a',
  }

  const pair1B = {
    id: faker.random.uuid(),
    name: 'b',
  }

  const pair1C = {
    id: faker.random.uuid(),
    name: 'c',
  }

  const pair2A = {
    id: faker.random.uuid(),
    name: 'a',
  }

  const pair2B = {
    id: faker.random.uuid(),
    name: 'b',
  }
  //pairテーブルのデータ作成
  //pair1A
  await prisma.pair.create({
    data: {
      ...pair1A,
    },
  })
  //pair1B
  await prisma.pair.create({
    data: {
      ...pair1B,
    },
  })
  //pair1C
  await prisma.pair.create({
    data: {
      ...pair1C,
    },
  })
  // pair2A
  await prisma.pair.create({
    data: {
      ...pair2A,
    },
  })
  // pair2B
  await prisma.pair.create({
    data: {
      ...pair2B,
    },
  })
}
