export class ReleaseIndex {
  public id: string;
  public addedAt: Date;
  public updatedAt: Date;

  constructor(
    id: string,
    addedAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.addedAt = addedAt;
    this.updatedAt = updatedAt;
  }
}
