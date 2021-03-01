import { prisma } from 'src/../testUtil/prisma'
import * as faker from 'faker'

export const seedUser = async (params: {
  id?: string
  email?: string
  fullname?: string
}) => {
  const { id, email, fullname } = params
  await prisma.user.create({
    data: {
      id: id ?? faker.random.uuid(),
      email: email ?? faker.internet.email(),
      fullname:
        fullname ?? `${faker.name.firstName()} ${faker.name.lastName()}`,
    },
  })
}
