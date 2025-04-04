export class Screenshot {
  public screenshotId?: string;
  public originalUrl?: string;
  public x166Url?: string;
  public x332Url?: string;

  constructor(data: Partial<Screenshot>) {
    Object.assign(this, data);
  }
}
