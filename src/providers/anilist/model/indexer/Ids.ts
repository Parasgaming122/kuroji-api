export class Ids {
  public sfw?: number[];
  public nsfw?: number[];

  constructor(sfw?: number[], nsfw?: number[]) {
    this.sfw = sfw;
    this.nsfw = nsfw;
  }

  public getIds(): number[] {
    const combinedIds: number[] = [];
    if (this.sfw) {
      combinedIds.push(...this.sfw);
    }
    if (this.nsfw) {
      combinedIds.push(...this.nsfw);
    }
    return combinedIds;
  }
}
