import { BasicId } from '../../shared/BasicId';
import { AiredOn } from './others/AiredOn';
import { ReleasedOn } from './others/ReleasedOn';
import { Screenshot } from './others/Screenshot';
import { Video } from './others/Video';
import { Poster } from './Poster';

export class Shikimori {
  public id!: string;
  public malId?: string;
  public name?: string;
  public russian?: string;
  public licenseNameRu?: string;
  public english?: string;
  public japanese?: string;
  public synonyms?: string[];
  public kind?: string;
  public rating?: string;
  public score?: number;
  public status?: string;
  public episodes?: number;
  public episodesAired?: number;
  public duration?: number;
  public airedOn?: AiredOn;
  public releasedOn?: ReleasedOn;
  public url?: string;
  public season?: string;
  public poster?: Poster;
  public createdAt?: string;
  public updatedAt?: string;
  public nextEpisodeAt?: string;
  public chronology?: BasicId[];
  public videos?: Video[];
  public screenshots?: Screenshot[];

  constructor(data: Partial<Shikimori>) {
    Object.assign(this, data);
  }
}
