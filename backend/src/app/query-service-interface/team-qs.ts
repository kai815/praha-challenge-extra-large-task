export class TeamDTO {
  public readonly id: string
  public readonly name: string
  // public readonly pairs: string[]
  public constructor(props: { id: string; name: string }) {
    const { id, name } = props
    this.id = id
    this.name = name
    // this.pairs = pairs
  }
}

export interface ITeamQS {
  getAll(): Promise<TeamDTO[]>
}
