import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({})
import { createUserTestData } from '../../testUtil/user-data-factory'

async function main() {
  const randomUser = createUserTestData()
  console.log(randomUser)
  await prisma.user.create({ data: { ...randomUser, status: 'Inmembership' } })
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
