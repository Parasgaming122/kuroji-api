import { BasicId } from '../../../shared/BasicId';
import { Shikimori } from '../../shikimori/model/Shikimori';
import { BasicRelease } from './BasicRelease';

export class Release {
  public id!: number;
  public idMal?: number;
  public siteUrl?: string;
  public title?: Title;
  public coverImage?: CoverImage;
  public bannerImage?: string;
  public status?: string;
  public type?: string;
  public format?: string;
  public updatedAt?: number;
  public description?: string;
  public startDate?: DateDetails;
  public endDate?: DateDetails;
  public season?: string;
  public seasonYear?: number;
  public episodes?: number;
  public episodesAired?: number;
  public duration?: number;
  public countryOfOrigin?: string;
  public isLicensed?: boolean;
  public source?: string;
  public hashtag?: string;
  public trailer?: Trailer;
  public isLocked?: boolean;
  public isAdult?: boolean;
  public averageScore?: number;
  public meanScore?: number;
  public popularity?: number;
  public trending?: number;
  public favourites?: number;
  public genres?: string[];
  public synonyms?: string[];
  public recommendations?: RecommendationEdgeWrapper<BasicId>;
  public recommendation?: RecommendationEdgeWrapper<BasicRelease>;
  public characters?: CharacterEdgeWrapper;
  public studios?: StudioEdgeWrapper;
  public airingSchedule?: AiringEdgeWrapper;
  public nextAiringEpisode?: AiringEpisode;
  public tags?: Tag[];
  public externalLinks?: ExternalLink[];
  public streamingEpisodes?: StreamingEpisode[];
  public stats?: Stats;
  public comments?: Comment[];
  public chronology?: BasicRelease[];
  public shikimori?: Shikimori;

  constructor(data: Partial<Release>) {
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

  public dateToString(): string {
    return `${this.year?.toString().padStart(4, '0')}-${this.month
      ?.toString()
      .padStart(2, '0')}-${this.day?.toString().padStart(2, '0')}`;
  }
}

export class Trailer {
  public id?: string;
  public site?: string;
  public thumbnail?: string;

  constructor(data: Partial<Trailer>) {
    Object.assign(this, data);
  }
}

export class RecommendationEdgeWrapper<T> {
  public edges?: RecommendationEdge<T>[];

  constructor(data: Partial<RecommendationEdgeWrapper<T>>) {
    Object.assign(this, data);
  }
}

export class RecommendationEdge<T> {
  public node?: RecommendationNode<T>;

  constructor(data: Partial<RecommendationEdge<T>>) {
    Object.assign(this, data);
  }
}

export class RecommendationNode<T> {
  public id?: number;
  public rating?: number;
  public mediaRecommendation?: T;

  constructor(data: Partial<RecommendationNode<T>>) {
    Object.assign(this, data);
  }
}

export class CharacterEdgeWrapper {
  public edges?: CharacterEdge[];

  constructor(data: Partial<CharacterEdgeWrapper>) {
    Object.assign(this, data);
  }
}

export class CharacterEdge {
  public role?: string;
  public node?: CharacterNode;

  constructor(data: Partial<CharacterEdge>) {
    Object.assign(this, data);
  }
}

export class CharacterNode {
  public id?: number;
  public gender?: string;
  public age?: string;
  public name?: Name;
  public image?: Image;

  constructor(data: Partial<CharacterNode>) {
    Object.assign(this, data);
  }
}

export class Name {
  public first?: string;
  public middle?: string;
  public last?: string;
  public full?: string;
  public native?: string;

  constructor(data: Partial<Name>) {
    Object.assign(this, data);
  }
}

export class Image {
  public large?: string;
  public medium?: string;

  constructor(data: Partial<Image>) {
    Object.assign(this, data);
  }
}

export class StudioEdgeWrapper {
  public edges?: StudioEdge[];

  constructor(data: Partial<StudioEdgeWrapper>) {
    Object.assign(this, data);
  }
}

export class StudioEdge {
  public id?: number;
  public isMain?: boolean;
  public node?: Studio;

  constructor(data: Partial<StudioEdge>) {
    Object.assign(this, data);
  }
}

export class Studio {
  public id?: number;
  public name?: string;
  public siteUrl?: string;

  constructor(data: Partial<Studio>) {
    Object.assign(this, data);
  }
}

export class AiringEdgeWrapper {
  public edges?: AiringScheduleEdge[];

  constructor(data: Partial<AiringEdgeWrapper>) {
    Object.assign(this, data);
  }
}

export class AiringScheduleEdge {
  public node?: AiringEpisode;

  constructor(data: Partial<AiringScheduleEdge>) {
    Object.assign(this, data);
  }
}

export class AiringEpisode {
  public id?: number;
  public airingAt?: number;
  public timeUntilAiring?: number;
  public episode?: number;
  public mediaId?: number;

  constructor(data: Partial<AiringEpisode>) {
    Object.assign(this, data);
  }
}

export class Tag {
  public id?: number;
  public name?: string;
  public description?: string;
  public category?: string;
  public rank?: number;
  public isGeneralSpoiler?: boolean;
  public isMediaSpoiler?: boolean;
  public isAdult?: boolean;
  public userId?: number;

  constructor(data: Partial<Tag>) {
    Object.assign(this, data);
  }
}

export class ExternalLink {
  public id?: number;
  public url?: string;
  public site?: string;
  public siteId?: number;
  public type?: string;
  public language?: string;
  public color?: string;
  public icon?: string;
  public notes?: string;
  public isDisabled?: boolean;

  constructor(data: Partial<ExternalLink>) {
    Object.assign(this, data);
  }
}

export class StreamingEpisode {
  public title?: string;
  public thumbnail?: string;
  public url?: string;
  public site?: string;

  constructor(data: Partial<StreamingEpisode>) {
    Object.assign(this, data);
  }
}

export class Stats {
  public scoreDistribution?: ScoreDistribution[];
  public statusDistribution?: StatusDistribution[];

  constructor(data: Partial<Stats>) {
    Object.assign(this, data);
  }
}

export class ScoreDistribution {
  public score?: number;
  public amount?: number;

  constructor(data: Partial<ScoreDistribution>) {
    Object.assign(this, data);
  }
}

export class StatusDistribution {
  public status?: string;
  public amount?: number;

  constructor(data: Partial<StatusDistribution>) {
    Object.assign(this, data);
  }
}
