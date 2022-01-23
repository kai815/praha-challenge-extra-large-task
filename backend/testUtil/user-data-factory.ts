import * as faker from 'faker'
type RandomUser = {
  id: string
  name: string
  email: string
}
export const createUserTestData = (): RandomUser => {
  return {
    id: faker.random.uuid(),
    name: `${faker.name.lastName()} ${faker.name.firstName()}`,
    email: faker.internet.email(),
  }
}
