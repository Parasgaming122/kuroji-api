export class Poster {
  public posterId?: string;
  public originalUrl?: string;
  public mainUrl?: string;

  constructor(data: Partial<Poster>) {
    Object.assign(this, data);
  }
}
