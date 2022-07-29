import { Team } from 'src/domain/entity/team'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { TeamService } from 'src/domain/service/team.service'

//mock
jest.mock('src/infra/db/repository/team-repository') // パスを指定
const TeamRepoMock = TeamRepository as jest.Mock

//TeamRepoのmock
TeamRepoMock.mockImplementationOnce(() => {
  return {
    getLastTeamName: async () => {
      return '1'
    },
  }
})

describe('team.service.test', () => {
  describe('getNewTeamName', () => {
    it('[正常系]最後のチーム名(数字である)に+1されている', async () => {
      const teamService = new TeamService(new TeamRepoMock())
      const teamName = await teamService.getNewTeamName()
      expect(teamName).toEqual('2')
    })
  })
  // describe('getMinimumMemberTeam', () => {})
  // describe('increaseTeamMember', () => {})
})
