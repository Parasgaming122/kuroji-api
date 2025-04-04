import { Poster } from './Poster';

export class BasicShikimori {
  public id?: number;
  public name?: string;
  public url?: string;
  public poster?: Poster;
  constructor(data: Partial<BasicShikimori>) {
    Object.assign(this, data);
  }
}
