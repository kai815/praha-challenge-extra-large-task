import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({})
import { userSeed } from './User'

async function main() {
  await userSeed(prisma)
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
