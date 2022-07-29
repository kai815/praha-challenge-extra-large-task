import { createRandomIdString } from 'src/util/random'

const userIdMember1Pair1 = createRandomIdString()
const userIdMember2Pair1 = createRandomIdString()
const userIdMember1Pair2 = createRandomIdString()
const userIdMember2Pair2 = createRandomIdString()
export const normalPair1 = {
  id: createRandomIdString(),
  name: 'a',
  teamPairId: createRandomIdString(),
}
export const normalPair2 = {
  id: createRandomIdString(),
  name: 'b',
  teamPairId: createRandomIdString(),
}
export const normalTeam = {
  id: createRandomIdString(),
  name: '1',
}
//pair1のメンバー
export const normalMember1Pair1 = {
  id: createRandomIdString(),
  pairId: normalPair1.id,
  userId: userIdMember1Pair1,
}
export const normalMember2Pair1 = {
  id: createRandomIdString(),
  pairId: normalPair1.id,
  userId: userIdMember2Pair1,
}
export const normalMember3Pair1 = {
  id: createRandomIdString(),
  pairId: normalPair1.id,
  userId: userIdMember2Pair1,
}
//pair2のメンバー
export const normalMember1Pair2 = {
  id: createRandomIdString(),
  pairId: normalPair2.id,
  userId: userIdMember1Pair2,
}
export const normalMember2Pair2 = {
  id: createRandomIdString(),
  pairId: normalPair2.id,
  userId: userIdMember2Pair2,
}
