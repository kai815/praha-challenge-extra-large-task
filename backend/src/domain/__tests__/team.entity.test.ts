import { Team, Pair, Member } from 'src/domain/entity/team'
import { createRandomIdString } from 'src/util/random'
import {
  normalPair1,
  normalPair2,
  normalTeam,
  normalMember1Pair1,
  normalMember2Pair1,
  normalMember3Pair1,
  normalMember1Pair2,
  normalMember2Pair2,
} from '../../../testUtil/team-data-factory'

/**
 * team
 * pair1 2名
 * pair2 2名
 */
const generateTeamHavingMember4Pair2 = () => {
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
  return {
    team,
    pair1,
    pair2,
    member1Pair1,
    member2Pair1,
    member1Pair2,
    member2Pair2,
  }
}
/**
 * team
 * pair1 3名
 * pair2 2名
 */
const generateTeamHavingMember5Pair2 = () => {
  const member1Pair1 = new Member(normalMember1Pair1)
  const member2Pair1 = new Member(normalMember2Pair1)
  const member3Pair1 = new Member(normalMember3Pair1)
  const member1Pair2 = new Member(normalMember1Pair2)
  const member2Pair2 = new Member(normalMember2Pair2)
  const pair1 = new Pair({
    ...normalPair1,
    members: [member1Pair1, member2Pair1, member3Pair1],
  })
  const pair2 = new Pair({
    ...normalPair2,
    members: [member1Pair2, member2Pair2],
  })
  const team = new Team({
    ...normalTeam,
    pairs: [pair1, pair2],
  })
  return {
    team,
    pair1,
    pair2,
    member1Pair1,
    member2Pair1,
    member3Pair1,
    member1Pair2,
    member2Pair2,
  }
}

describe('task.entity.test', () => {
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
  describe('[team]getTeamMemberCount', () => {
    it('[正常系]メンバーの人数が取得できる', () => {
      const { team } = generateTeamHavingMember4Pair2()
      expect(team.getTeamMemberCount()).toEqual(4)
    })
  })
  describe('[team]getMinimuMemberPair', () => {
    it('[正常系]メンバーが少ないペアが取得できる', () => {
      const { team, pair2 } = generateTeamHavingMember5Pair2()
      expect(team.getMinimuMemberPair()).toEqual(pair2)
    })
  })
  describe('[team]addPairMember', () => {
    it('[正常系]少ないペアにteamのメンバーが追加されている', () => {
      const {
        team,
        pair1,
        member1Pair2,
        member2Pair2,
      } = generateTeamHavingMember5Pair2()
      const addingUserId = createRandomIdString()
      const addingMemberId = createRandomIdString()
      const addedMember = new Member({
        id: addingMemberId,
        userId: addingUserId,
        pairId: normalPair2.id,
      })
      // メンバー追加された後のペア2
      const addedPair2 = new Pair({
        ...normalPair2,
        members: [member1Pair2, member2Pair2, addedMember],
      })
      team.addPairMember({ userId: addingUserId, memberId: addingMemberId })
      expect(team.getAllProperties().pairs).toEqual([pair1, addedPair2])
    })
  })
  describe('[team]getPairByUserId', () => {
    it('[正常系]ユーザーIDによりペアを取得できる', () => {
      const { team, pair1 } = generateTeamHavingMember5Pair2()
      expect(team.getPairByUserId(normalMember1Pair1.userId)).toEqual(pair1)
    })
  })

  describe('[team]isEnableDecreaseTeamMember', () => {
    it('[正常系]メンバーが4名以上ならtrueを返す', () => {
      const { team } = generateTeamHavingMember4Pair2()
      expect(team.isEnableDecreaseTeamMember()).toEqual(true)
    })
  })

  describe('[team]decreaseTeamMember', () => {
    it('[正常系]4名チームの2名ペアのユーザーが減る。元々4名のチームが3名になっているpair1が3名になっている', () => {
      const { team, pair1, member2Pair2 } = generateTeamHavingMember4Pair2()
      team.decreaseTeamMember(member2Pair2.getAllProperties().userId)
      expect(team.getTeamMemberCount()).toEqual(3)
      expect(
        team
          .getPairByUserId(member2Pair2.getAllProperties().userId)
          ?.getAllProperties().id,
      ).toEqual(pair1.getAllProperties().id)
    })
    it('[正常系]5名チームの3名のペアに所属するユーザーが減る。元々5名のチームが4名になっている3名だったpair1が2名になっている', () => {
      const {
        team,
        member1Pair1,
        member2Pair1,
      } = generateTeamHavingMember5Pair2()
      team.decreaseTeamMember(member1Pair1.getAllProperties().userId)
      expect(team.getTeamMemberCount()).toEqual(4)
      const updatedPair1 = team.getPairByUserId(
        member2Pair1.getAllProperties().userId,
      )
      expect(updatedPair1?.getAllProperties().membersCount).toEqual(2)
    })

    //TODOここのテストが落ちてるので修正
    it('[正常系]5名チームの2名のペアに所属するユーザーが減る。元々5名のチームが4名になっているpair1の3名の1人がpair2になっている', () => {
      const {
        team,
        member1Pair1,
        member2Pair2,
      } = generateTeamHavingMember5Pair2()
      team.decreaseTeamMember(member2Pair2.getAllProperties().userId)
      expect(team.getTeamMemberCount()).toEqual(4)
      const updatedPair1 = team.getPairByUserId(
        member1Pair1.getAllProperties().userId,
      )
      const updatedPair2 = team.getPairByUserId(
        member1Pair1.getAllProperties().userId,
      )
      expect(updatedPair1?.getAllProperties().membersCount).toEqual(2)
      expect(updatedPair2?.getAllProperties().membersCount).toEqual(2)
    })
  })

  describe('[team]getPairByMemberId', () => {
    it('[正常系]userIdによりペアを取得できる', () => {
      const { team, member1Pair1 } = generateTeamHavingMember4Pair2()
      expect(
        team.getMemberByUserId(member1Pair1.getAllProperties().userId),
      ).toEqual(member1Pair1)
    })
  })
  describe('[team]getOutingPairs', () => {
    it('[正常系]pairIds以外のペアを取得できる', () => {
      const { team, pair1, pair2 } = generateTeamHavingMember4Pair2()
      expect(team.getOutingPairs([pair1.getAllProperties().id])).toEqual([
        pair2,
      ])
    })
  })

  //ここからpairのテスト
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
  describe('[pair]addMember', () => {
    it('[正常系]メンバーが追加されている', () => {
      const member1Pair1 = new Member(normalMember1Pair1)
      const member2Pair1 = new Member(normalMember2Pair1)
      // const member3Pair1 = new Member(normalMember3Pair1)
      const pair = new Pair({
        ...normalPair1,
        members: [member1Pair1, member2Pair1],
      })
      const addingUserId = createRandomIdString()
      const addingMemberId = createRandomIdString()
      const addedMember = new Member({
        id: addingMemberId,
        userId: addingUserId,
        pairId: normalPair1.id,
      })
      pair.addMember({ userId: addingUserId, memberId: addingMemberId })
      expect(pair.getAllProperties().members).toEqual([
        member1Pair1,
        member2Pair1,
        addedMember,
      ])
    })
  })
  describe('[pair]isEnableDecreaseMember', () => {
    it('[正常系]メンバーが3名以上ならtrue', () => {
      const member1Pair1 = new Member(normalMember1Pair1)
      const member2Pair1 = new Member(normalMember2Pair1)
      const member3Pair1 = new Member(normalMember3Pair1)
      const pair = new Pair({
        ...normalPair1,
        members: [member1Pair1, member2Pair1, member3Pair1],
      })
      expect(pair.isEnableDecreaseMember()).toEqual(true)
    })
  })
})
