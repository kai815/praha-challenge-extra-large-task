import { PrismaClient, User, Pair } from '@prisma/client'
import * as faker from 'faker'

// pairseedから呼ばれる想定
export async function pairMemberSeed(
  prisma: PrismaClient,
  from: number,
  to: number,
  users: User[],
  pair: Pair,
) {
  //pairMemberテーブルのデータ作成
  const filteredUser = users.filter((_user, index) => {
    if (index >= from && index <= to) return true
  })
  for (const user of filteredUser) {
    const pairMember = {
      id: faker.random.uuid(),
      userId: user.id,
      pairId: pair.id,
    }
    console.log({ pairMember })
    const createdPairMember = await prisma.pairMember.create({
      data: {
        ...pairMember,
      },
    })
    console.log({ createdPairMember })
  }
}
