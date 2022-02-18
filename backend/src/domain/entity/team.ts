import { User } from './user'

export class Team {
  private id: string
  public readonly name: string
  public readonly pairs: Pair[]
  public constructor(props: { id: string; name: string; pairs: Pair[] }) {
    const { id, name, pairs } = props
    if (!this.valdateName(name).valid) {
      throw new Error(this.valdateName(name).errorMessage)
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
      result.errorMessage = '4文字以上の文字はpairの名前にできません。'
      return result
    }
    return result
  }
}

class Pair {
  private id: string
  public readonly name: string
  public readonly members: User[]
  public readonly membersNumber: number
  public constructor(props: { id: string; name: string; members: User[] }) {
    const { id, name, members } = props
    if (!this.valdateName(name).valid) {
      throw new Error(this.valdateName(name).errorMessage)
    }
    if (!this.valdateMemberNumber(members).valid) {
      throw new Error(this.valdateMemberNumber(members).errorMessage)
    }
    this.id = id
    this.name = name
    this.members = members
    this.membersNumber = members.length
  }
  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      members: this.members,
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
  private valdateMemberNumber(members: User[]) {
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
