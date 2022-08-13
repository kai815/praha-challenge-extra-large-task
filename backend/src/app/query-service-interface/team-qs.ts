export class TeamDTO {
  public readonly id: string
  public readonly name: string
  public readonly pairs: PairDTO[]
  public constructor(props: { id: string; name: string; pairs: PairDTO[] }) {
    const { id, name, pairs } = props
    this.id = id
    this.name = name
    this.pairs = pairs
  }
}
export class PairDTO {
  public readonly id: string
  public readonly name: string
  public membersCount: number
  private members: MemberDTO[]
  public constructor(props: {
    id: string
    name: string
    members: MemberDTO[]
  }) {
    const { id, name, members } = props
    this.id = id
    this.name = name
    this.members = members
    this.membersCount = members.length
  }
}

export class MemberDTO {
  public userId: string
  constructor(props: { userId: string }) {
    this.userId = props.userId
  }
}

export interface ITeamQS {
  getAll(): Promise<TeamDTO[]>
}
