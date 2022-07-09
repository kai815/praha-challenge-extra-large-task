import { PrismaClient } from '@prisma/client'
import { createUserTestData } from '../../../testUtil/user-data-factory'

export async function userSeed(prisma: PrismaClient) {
  return [...Array(10)].map(async (_) => {
    const randomUser = createUserTestData()
    await prisma.user.create({
      data: { ...randomUser, status: 'Inmembership' },
    })
    console.log('user', { ...randomUser, status: 'Inmembership' })
  })
}
