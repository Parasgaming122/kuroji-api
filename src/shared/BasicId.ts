export class BasicId {
  public id?: number;
  public idMal?: number;

  constructor(data: Partial<BasicId>) {
    Object.assign(this, data);
  }
}
