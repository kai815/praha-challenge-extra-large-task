export class Task {
  private id: string
  public readonly title: string
  public readonly reason: string
  public readonly description: string
  public constructor(props: {
    id: string
    title: string
    reason: string
    description: string
  }) {
    const { id, title, reason, description } = props
    this.id = id
    this.title = title
    this.reason = reason
    this.description = description
  }
  public getAllProperties() {
    return {
      id: this.id,
      title: this.title,
      reason: this.reason,
      description: this.description,
    }
  }
}
