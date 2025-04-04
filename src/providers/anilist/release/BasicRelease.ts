import { BasicShikimori } from '../../shikimori/BasicShikimori';

export class BasicRelease {
  public id: number;
  public idMal?: number;

  public siteUrl?: string;
  public title?: Title;

  public synonyms?: string[];

  public bannerImage?: string;
  public coverImage?: CoverImage;

  public type?: string;
  public format?: string;
  public status?: string;
  public description?: string;

  public startDate?: DateDetails;

  public season?: string;
  public seasonYear?: number;

  public episodes?: number;
  public episodesAired?: number;
  public duration?: number;

  public countryOfOrigin?: string;
  public popularity?: number;
  public favourites?: number;

  public averageScore?: number;
  public meanScore?: number;

  public isLocked?: boolean;
  public isAdult?: boolean;

  public genres?: string[];

  public nextAiringEpisode?: AiringEpisode;

  public shikimori?: BasicShikimori;

  constructor(data: Partial<BasicRelease>) {
    Object.assign(this, data);
  }
}

export class Title {
  public romaji?: string;
  public english?: string;
  public native?: string;

  constructor(data: Partial<Title>) {
    Object.assign(this, data);
  }
}

export class CoverImage {
  public extraLarge?: string;
  public large?: string;
  public medium?: string;
  public color?: string;

  constructor(data: Partial<CoverImage>) {
    Object.assign(this, data);
  }
}

export class DateDetails {
  public year?: number;
  public month?: number;
  public day?: number;

  constructor(data: Partial<DateDetails>) {
    Object.assign(this, data);
  }
}

export class AiringEpisode {
  public id?: number;
  public airingAt?: number;
  public timeUntilAiring?: number;
  public episode?: number;

  constructor(data: Partial<AiringEpisode>) {
    Object.assign(this, data);
  }
}
