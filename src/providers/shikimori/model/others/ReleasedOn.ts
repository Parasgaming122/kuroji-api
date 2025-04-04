export class ReleasedOn {
  public releaseYear?: number;
  public releaseMonth?: number;
  public releaseDay?: number;
  public releaseDate?: string;

  constructor(data: Partial<ReleasedOn>) {
    Object.assign(this, data);
  }
}
