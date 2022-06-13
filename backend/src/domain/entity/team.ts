import { User } from './user'
import { Status } from './zaiseki-status'

export class Team {
  private id: string
  public readonly name: string
  public readonly pairs: Pair[]
  public constructor(props: { id: string; name: string; pairs: Pair[] }) {
    const { id, name, pairs } = props
    if (!this.valdateName(name).valid) {
      throw new Error(this.valdateName(name).errorMessage)
    }
    if (!this.validateMenbersCount(pairs).valid) {
      throw new Error(this.validateMenbersCount(pairs).errorMessage)
    }
    this.id = id
    this.name = name
    this.pairs = pairs
  }
  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      pairs: this.pairs,
    }
  }
  private valdateName(name: string) {
    const regexp = /^[0-9]+$/
    const result = { valid: true, errorMessage: '' }
    if (!regexp.test(name)) {
      result.valid = false
      result.errorMessage = '半角数字しかteamの名前には使用できません。'
      return result
    }
    if (name.length > 3) {
      result.valid = false
      result.errorMessage = '4文字以上の文字はteamの名前にできません。'
      return result
    }
    return result
  }
  private validateMenbersCount(pairs: Pair[]) {
    const result = { valid: true, errorMessage: '' }
    const amount = pairs.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.getAllProperties().membersCount,
      0,
    )
    if (amount < 3) {
      result.valid = false
      result.errorMessage = '3名未満のteamは存在できません。'
    }
    return result
  }
  public getTeamMemberCount() {
    return this.pairs.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.membersCount,
      0,
    )
  }
  public getMinimuMemberPair() {
    return this.pairs.reduce((previousValue, currentValue) =>
      previousValue.membersCount > currentValue.membersCount
        ? previousValue
        : currentValue,
    )
  }
}

export class Pair {
  private id: string
  public readonly name: string
  public readonly members: Member[]
  public readonly membersCount: number
  private teamPairId: string
  public constructor(props: {
    id: string
    name: string
    members: Member[]
    teamPairId: string
  }) {
    const { id, name, members, teamPairId } = props
    if (!this.valdateName(name).valid) {
      throw new Error(this.valdateName(name).errorMessage)
    }
    if (!this.valdateMembersCount(members).valid) {
      throw new Error(this.valdateMembersCount(members).errorMessage)
    }
    this.id = id
    this.name = name
    this.members = members
    this.membersCount = members.length
    this.teamPairId = teamPairId
  }
  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      members: this.members,
      membersCount: this.membersCount,
      teamPairId: this.teamPairId,
    }
  }
  private valdateName(name: string) {
    const regexp = /^[a-zA-Z]+$/
    const result = { valid: true, errorMessage: '' }
    if (!regexp.test(name)) {
      result.valid = false
      result.errorMessage = '半角英字しかpairの名前には使用できません。'
      return result
    }
    if (name.length > 1) {
      result.valid = false
      result.errorMessage = '2文字以上の文字はpairの名前にできません。'
      return result
    }
    return result
  }
  private valdateMembersCount(members: Member[]) {
    const result = { valid: true, errorMessage: '' }
    if (members.length > 3) {
      result.valid = false
      result.errorMessage = '3名より多いペアは存在できません。'
      return result
    }
    if (members.length < 2) {
      result.valid = false
      result.errorMessage = '2名より少ないペアは存在できません。'
      return result
    }
    return result
  }
}

// export class Member extends User {
//   private pairMemberId: string
//   constructor(props: {
//     id: string
//     name: string
//     email: string
//     status?: Status
//     pairMemberId: string
//   }) {
//     const { id, name, email, status, pairMemberId } = props
//     super({ id, name, email, status })
//     this.pairMemberId = pairMemberId
//   }
//   getAllProperties() {
//     return {
//       id: this.id,
//       name: this.name,
//       email: this.email,
//       status: this.status,
//       pairMemberId: this.pairMemberId,
//     }
//   }
// }

export class Member {
  private id: string
  constructor(props: { id: string }) {
    this.id = props.id
  }
  getAllProperties() {
    return {
      id: this.id,
    }
  }
}
