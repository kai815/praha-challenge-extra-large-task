import { Team, Pair, Member } from 'src/domain/entity/Team'
import { createRandomIdString } from 'src/util/random'
import { Status } from 'src/domain/entity/zaiseki-status'
import { createUserTestData } from '../../../testUtil/user-data-factory'

describe('task.entity.test', () => {
  const user1 = createUserTestData()
  const user2 = createUserTestData()
  const user3 = createUserTestData()
  const user4 = createUserTestData()
  const normalMember1Pair1 = {
    ...user1,
    status: 'Inmembership' as Status,
    pairMemberId: createRandomIdString(),
  }
  const normalMember2Pair1 = {
    ...user2,
    status: 'Inmembership' as Status,
    pairMemberId: createRandomIdString(),
  }
  const normalMember1Pair2 = {
    ...user3,
    status: 'Inmembership' as Status,
    pairMemberId: createRandomIdString(),
  }
  const normalMember2Pair2 = {
    ...user4,
    status: 'Inmembership' as Status,
    pairMemberId: createRandomIdString(),
  }
  const normalPair1 = {
    id: createRandomIdString(),
    name: 'a',
    teamPairId: createRandomIdString(),
  }
  const normalPair2 = {
    id: createRandomIdString(),
    name: 'b',
    teamPairId: createRandomIdString(),
  }
  const normalTeam = {
    id: createRandomIdString(),
    name: '1',
  }
  describe('getAllProperties', () => {
    it('[正常系]作成したインスタンスのプロパティが全て取れる', () => {
      //テストのためのインスタンスの生成が長い気がする
      const member1Pair1 = new Member(normalMember1Pair1)
      const member2Pair1 = new Member(normalMember2Pair1)
      const member1Pair2 = new Member(normalMember1Pair2)
      const member2Pair2 = new Member(normalMember2Pair2)
      const pair1 = new Pair({
        ...normalPair1,
        members: [member1Pair1, member2Pair1],
      })
      const pair2 = new Pair({
        ...normalPair2,
        members: [member1Pair2, member2Pair2],
      })
      const team = new Team({
        ...normalTeam,
        pairs: [pair1, pair2],
      })
      expect(team.getAllProperties().id).toEqual(normalTeam.id)
      expect(team.getAllProperties().name).toEqual(normalTeam.name)
      expect(team.getAllProperties().pairs).toEqual([pair1, pair2])
      expect(pair1.getAllProperties().id).toEqual(normalPair1.id)
      expect(pair1.getAllProperties().name).toEqual(normalPair1.name)
      expect(pair1.getAllProperties().teamPairId).toEqual(
        normalPair1.teamPairId,
      )
      expect(pair1.getAllProperties().members).toEqual([
        member1Pair1,
        member2Pair1,
      ])
      expect(pair1.getAllProperties().membersCount).toEqual(2)
      expect(member1Pair1.getAllProperties().id).toEqual(normalMember1Pair1.id)
      expect(member1Pair1.getAllProperties().name).toEqual(
        normalMember1Pair1.name,
      )
      expect(member1Pair1.getAllProperties().email).toEqual(
        normalMember1Pair1.email,
      )
      expect(member1Pair1.getAllProperties().status).toEqual(
        normalMember1Pair1.status,
      )
      expect(member1Pair1.getAllProperties().pairMemberId).toEqual(
        normalMember1Pair1.pairMemberId,
      )
    })
  })
})
