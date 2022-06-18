import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({})
import { userSeed } from './User'
import { taskSeed } from './Task'
import { userTaskSeed } from './UserTask'
import { teamSeed } from './Team'

async function main() {
  await prisma.userTask.deleteMany()
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()
  await userSeed(prisma)
  await taskSeed(prisma)
  await userTaskSeed(prisma)
  await teamSeed(prisma)
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
