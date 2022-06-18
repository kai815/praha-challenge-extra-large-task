import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({})
import { userSeed } from './User'
import { taskSeed } from './Task'

async function main() {
  await prisma.userTask.deleteMany()
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()
  await userSeed(prisma)
  await taskSeed(prisma)
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
