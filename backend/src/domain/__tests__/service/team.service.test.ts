import { Team, Pair, Member } from 'src/domain/entity/team'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { TeamService } from 'src/domain/service/team.service'
import {
  normalPair1,
  normalPair2,
  normalTeam,
  normalTeam2,
  normalMember1Pair1,
  normalMember2Pair1,
  normalMember3Pair1,
  normalMember1Pair2,
  normalMember2Pair2,
  normalMember1Pair3,
  normalMember2Pair3,
  normalMember3Pair3,
} from '../../../../testUtil/team-data-factory'
import { createRandomIdString } from 'src/util/random'

//mock
jest.mock('src/infra/db/repository/team-repository') // パスを指定
const TeamRepoMock = TeamRepository as jest.Mock

//teamのデータ
const member1Pair1 = new Member(normalMember1Pair1)
const member2Pair1 = new Member(normalMember2Pair1)
const member3Pair1 = new Member(normalMember3Pair1)
const member1Pair2 = new Member(normalMember1Pair2)
const member2Pair2 = new Member(normalMember2Pair2)
const member1Pair3 = new Member(normalMember1Pair3)
const member2Pair3 = new Member(normalMember2Pair3)
const member3Pair3 = new Member(normalMember3Pair3)
const pair1 = new Pair({
  ...normalPair1,
  members: [member1Pair1, member2Pair1, member3Pair1],
})
const pair2 = new Pair({
  ...normalPair2,
  members: [member1Pair2, member2Pair2],
})
const pair3 = new Pair({
  ...normalPair2,
  members: [member1Pair3, member2Pair3, member3Pair3],
})
const team1 = new Team({
  ...normalTeam,
  pairs: [pair1, pair2],
})
const team2 = new Team({
  ...normalTeam2,
  pairs: [pair3],
})

describe('team.service.test', () => {
  describe('getNewTeamName', () => {
    it('[正常系]最後のチーム名(数字である)に+1されている', async () => {
      //TeamRepoのmock
      TeamRepoMock.mockImplementationOnce(() => {
        return {
          getLastTeamName: async () => {
            return '1'
          },
        }
      })
      const teamService = new TeamService(new TeamRepoMock())
      const teamName = await teamService.getNewTeamName()
      expect(teamName).toEqual('2')
    })
  })
  describe('getMinimumMemberTeam', () => {
    it('[正常系]チームメンバーが少ないチームが取得できる', async () => {
      //TeamRepoのmock
      TeamRepoMock.mockImplementationOnce(() => {
        return {
          getAllTeam: async () => {
            return [team1, team2]
          },
        }
      })
      const teamService = new TeamService(new TeamRepoMock())
      const minimumMemberTeam = await teamService.getMinimumMemberTeam()
      expect(minimumMemberTeam).toEqual(team2)
    })
  })
  describe('increaseTeamMember', () => {
    it('[正常系]チームメンバーが増えているかつ人数が少ないペアで人数が増えている', async () => {
      TeamRepoMock.mockImplementationOnce(() => {
        return {
          getAllTeam: async () => {
            return [team1]
          },
        }
      })
      const teamService = new TeamService(new TeamRepoMock())
      const addingUserId = createRandomIdString()
      const addedTeam = await teamService.increaseTeamMember(addingUserId)
      expect(addedTeam.getTeamMemberCount()).toEqual(6)
    })
  })
})
