import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'
import { pairMemberSeed } from '../PairMember'

export async function pairSeed(prisma: PrismaClient) {
  const users = await prisma.user.findMany()
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
  //pairテーブルとpairMemberテーブルのデータ作成

  //pair1A
  await prisma.pair.create({
    data: {
      ...pair1A,
    },
  })
  //0~1番目のユーザーをpair1Aに紐付ける
  await pairMemberSeed(prisma, 0, 1, users, pair1A)

  //pair1B
  await prisma.pair.create({
    data: {
      ...pair1B,
    },
  })
  //2~3番目のユーザーをpair1Bに紐付ける
  await pairMemberSeed(prisma, 2, 3, users, pair1B)

  //pair1C
  await prisma.pair.create({
    data: {
      ...pair1C,
    },
  })
  //4~5番目のユーザーをpair1Cに紐付ける
  await pairMemberSeed(prisma, 4, 5, users, pair1C)

  // pair2A
  await prisma.pair.create({
    data: {
      ...pair2A,
    },
  })
  //6~7番目のユーザーをpair2Aに紐付ける
  await pairMemberSeed(prisma, 6, 7, users, pair2A)

  // pair2B
  await prisma.pair.create({
    data: {
      ...pair2B,
    },
  })
  //8~9番目のユーザーをpair2Bに紐付ける
  await pairMemberSeed(prisma, 8, 9, users, pair2B)
}
