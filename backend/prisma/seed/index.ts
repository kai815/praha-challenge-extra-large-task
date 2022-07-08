import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({})
import { userSeed } from './User'
import { taskSeed } from './Task'
import { userTaskSeed } from './UserTask'
import { teamSeed } from './Team'
import { pairSeed } from './Pair'

async function main() {
  await prisma.pairMember.deleteMany()
  await prisma.userTask.deleteMany()
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()
  await prisma.team.deleteMany()
  await prisma.pair.deleteMany()
  await userSeed(prisma)
  await taskSeed(prisma)
  await userTaskSeed(prisma)
  await teamSeed(prisma)
  await pairSeed(prisma)
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
