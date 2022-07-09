import { PrismaClient, Team, Pair } from '@prisma/client'
import * as faker from 'faker'

export async function teamPairSeed(
  prisma: PrismaClient,
  pairs: Pair[],
  team: Team,
) {
  //teamPairテーブルのデータ作成
  pairs.forEach(async (pair) => {
    const teamPair = {
      id: faker.random.uuid(),
      pairId: pair.id,
      teamId: team.id,
    }
    console.log({ teamPair })
    await prisma.teamPair.create({
      data: {
        ...teamPair,
      },
    })
  })
}
