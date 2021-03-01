import * as faker from 'faker'
import { Hello } from 'src/domain/sample/entity/hello'
import { prisma } from 'src/../testUtil/prisma'

export const seedHello = async (params: {
  id?: string
  hello?: string
  required?: boolean
  number?: number
  userId?: string[]
}) => {
  const { id, hello, required, number, userId } = params
  const helloEntity = new Hello({
    id: id ?? faker.random.uuid(),
    hello: hello ?? 'hoge',
    required: required ?? true,
    number: number ?? 1,
    userIds: userId ?? ['1', '2'],
  })
  await prisma.hello.create({
    data: {
      ...helloEntity.getAllProperties(),
    },
  })
}
