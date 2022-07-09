import { Team, Pair, Member } from 'src/domain/entity/Team'
import { createRandomIdString } from 'src/util/random'

describe('task.entity.test', () => {
  const normalMember1Pair1 = {
    id: createRandomIdString(),
  }
  const normalMember2Pair1 = {
    id: createRandomIdString(),
  }
  const normalMember1Pair2 = {
    id: createRandomIdString(),
  }
  const normalMember2Pair2 = {
    id: createRandomIdString(),
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
  describe('[team,pair,member]getAllProperties', () => {
    it('[正常系]team,pair,memberの作成したインスタンスのプロパティが全て取れる', () => {
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
      //team
      expect(team.getAllProperties().id).toEqual(normalTeam.id)
      expect(team.getAllProperties().name).toEqual(normalTeam.name)
      expect(team.getAllProperties().pairs).toEqual([pair1, pair2])
      //pair
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
      //member
      expect(member1Pair1.getAllProperties().id).toEqual(normalMember1Pair1.id)
    })
  })
  describe('[team]valdateName', () => {
    it('[異常系]teamの名前に半角数字以外が含まれる時にはエラーを吐く', () => {
      //テストのためのインスタンスの生成が長い気がする
      const abnormalTeam = {
        id: createRandomIdString(),
        name: 'aaa',
      }
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
      expect((): void => {
        new Team({
          ...abnormalTeam,
          pairs: [pair1, pair2],
        })
      }).toThrow('半角数字しかteamの名前には使用できません。')
    })
    it('[異常系]teamの名前が4文字以上の場合にはエラーを吐く', () => {
      //テストのためのインスタンスの生成が長い気がする
      const abnormalTeam = {
        id: createRandomIdString(),
        name: '1234',
      }
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
      expect((): void => {
        new Team({
          ...abnormalTeam,
          pairs: [pair1, pair2],
        })
      }).toThrow('4文字以上の文字はteamの名前にできません。')
    })
  })
  describe('[team]validateMenbersCount', () => {
    it('[異常系]teamのメンバーが3名未満の時はエラーを吐く', () => {
      const member1Pair1 = new Member(normalMember1Pair1)
      const member2Pair1 = new Member(normalMember2Pair1)
      const pair1 = new Pair({
        ...normalPair1,
        members: [member1Pair1, member2Pair1],
      })
      expect((): void => {
        new Team({
          ...normalTeam,
          pairs: [pair1],
        })
      }).toThrow('3名未満のteamは存在できません。')
    })
  })
  describe('[pair]valdateName', () => {
    it('[異常系]pairの名前に半角英字以外が含まれる場合エラーを吐く', () => {
      const abnormalPair1 = {
        id: createRandomIdString(),
        name: '1',
        teamPairId: createRandomIdString(),
      }
      const member1Pair1 = new Member(normalMember1Pair1)
      const member2Pair1 = new Member(normalMember2Pair1)
      expect((): void => {
        new Pair({
          ...abnormalPair1,
          members: [member1Pair1, member2Pair1],
        })
      }).toThrow('半角英字しかpairの名前には使用できません。')
    })
    it('[異常系]pairの名前が2文字以上の場合はエラーを吐く', () => {
      const abnormalPair1 = {
        id: createRandomIdString(),
        name: 'aa',
        teamPairId: createRandomIdString(),
      }
      const member1Pair1 = new Member(normalMember1Pair1)
      const member2Pair1 = new Member(normalMember2Pair1)
      expect((): void => {
        new Pair({
          ...abnormalPair1,
          members: [member1Pair1, member2Pair1],
        })
      }).toThrow('2文字以上の文字はpairの名前にできません。')
    })
  })
  describe('[pair]valdateMembersCount', () => {
    it('[異常系]pairのメンバーが3名よりも多い場合エラーを吐く', () => {
      const member1Pair1 = new Member(normalMember1Pair1)
      const member2Pair1 = new Member(normalMember2Pair1)
      const member3Pair1 = new Member(normalMember1Pair2)
      const member4Pair1 = new Member(normalMember2Pair2)
      expect((): void => {
        new Pair({
          ...normalPair1,
          members: [member1Pair1, member2Pair1, member3Pair1, member4Pair1],
        })
      }).toThrow('3名より多いペアは存在できません。')
    })
    it('[異常系]pairのメンバーが2名よりも少ない場合エラーを吐く', () => {
      const member1Pair1 = new Member(normalMember1Pair1)
      expect((): void => {
        new Pair({
          ...normalPair1,
          members: [member1Pair1],
        })
      }).toThrow('2名より少ないペアは存在できません。')
    })
  })
})
