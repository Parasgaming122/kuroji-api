export class AiredOn {
  public airedYear?: number;
  public airedMonth?: number;
  public airedDay?: number;
  public airedDate?: string;

  constructor(data: Partial<AiredOn>) {
    Object.assign(this, data);
  }
}
