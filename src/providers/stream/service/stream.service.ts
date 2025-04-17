import { Injectable } from '@nestjs/common';
import { Provider } from '../model/Provider'
import { SourceType } from '../model/SourceType'
import { ZoroService } from '../../zoro/service/zoro.service'
import { AnimekaiService } from '../../animekai/service/animekai.service'
import { AnimepaheService } from '../../animepahe/service/animepahe.service'
import { AnilistService } from '../../anilist/service/anilist.service'
import { TmdbService } from '../../tmdb/service/tmdb.service'
import { AnilistStreamingEpisode, AnimeKai, AnimekaiEpisode, Animepahe, AnimepaheEpisode, EpisodeZoro, TmdbSeasonEpisode, Zoro } from '@prisma/client'
import { Source } from '../model/Source'

export interface Episode {
  image: string,
  title: string,
  number: number,
  overview: string,
  date: string,
  sub: boolean,
  dub: boolean
}

export interface ProviderInfo {
  id: string,
  filler: boolean,
  provider: Provider,
  type: SourceType
}

@Injectable()
export class StreamService {
  constructor(
    private readonly aniwatch: ZoroService,
    private readonly animekai: AnimekaiService,
    private readonly animepahe: AnimepaheService,
    private readonly anilist: AnilistService,
    private readonly tmdb: TmdbService
  ) {}

  async getEpisodes(id: number): Promise<Episode[]> {
    try {
      const [aniwatch, season] = await Promise.all([
        this.aniwatch.getZoroByAnilist(id).catch(() => null),
        this.tmdb.getTmdbSeasonByAnilist(id).catch(() => null)
      ]);

      if (!season || !season.episodes) {
        const anilist = await this.anilist.getAnilist(id);
        const streamingEpisodes = anilist.streamingEpisodes as AnilistStreamingEpisode[];
        const episodes: Episode[] = streamingEpisodes.map((episode: any) => {
          const match = episode.title.match(/.*?(\d+).*/);
          const episodeNumber = match ? parseInt(match[1], 10) : 0;
          const sub = aniwatch ? this.isEpisodeAvailable(aniwatch, episodeNumber, true) : false;
          const dub = aniwatch ? this.isEpisodeAvailable(aniwatch, episodeNumber, false) : false;

          return {
            title: episode.title,
            image: episode.thumbnail,
            number: episodeNumber,
            overview: "",
            date: "",
            sub,
            dub,
          };
        });
        return episodes;
      }

      const seasonEpisodes = season.episodes as TmdbSeasonEpisode[];

      const episodes: Episode[] = seasonEpisodes.map((episode: TmdbSeasonEpisode) => {
        const episodeNumber = episode.episode_number || 0;
        const sub = aniwatch ? this.isEpisodeAvailable(aniwatch, episodeNumber, true) : false;
        const dub = aniwatch ? this.isEpisodeAvailable(aniwatch, episodeNumber, false) : false;

        return {
          title: episode.name || "",
          image: episode.still_path || "",
          number: episodeNumber,
          overview: episode.overview || "",
          date: episode.air_date || "",
          sub,
          dub,
        };
      });

      return episodes;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getEpisode(id: number, ep: number): Promise<Episode> {
    return (await this.getEpisodes(id)).find(e => e.number === ep) as Episode;
  }

  private isEpisodeAvailable(aniwatch: Zoro, episodeNumber: number, isSub: boolean): boolean {
    const episodes = aniwatch?.episodes as EpisodeZoro[];
    if (!episodes) {
      return false;
    }

    const episode = episodes.find(e => e.number === episodeNumber);
    if (!episode) {
      return false;
    }

    if (isSub) {
      return episode.isSubbed;
    } else {
      return episode.isDubbed;
    }
  }

  async getProvidersSingle(id: number, ep: number): Promise<ProviderInfo[]> {
    const zoroProviders: ProviderInfo[] = []
    const paheProviders: ProviderInfo[] = []
    const kaiProviders: ProviderInfo[] = []

    const zoroPromise = this.aniwatch.getZoroByAnilist(id)
      .then((zoro: Zoro) => {
        if (zoro && zoro.episodes) {
          const zoroEps = zoro.episodes as EpisodeZoro[]
          const zoroEp = zoroEps.find((e: EpisodeZoro) => e.number === ep)
          if (zoroEp) {
            if (zoroEp.isSubbed) {
              zoroProviders.push({
                id: zoroEp.id,
                filler: zoroEp.isFiller,
                provider: Provider.ANIWATCH,
                type: SourceType.SOFT_SUB,
              })
            }
            if (zoroEp.isDubbed) {
              zoroProviders.push({
                id: zoroEp.id,
                filler: zoroEp.isFiller,
                provider: Provider.ANIWATCH,
                type: SourceType.DUB,
              })
            }
          }
        }
      })
      .catch(() => { })

    const animepahePromise = this.animepahe.getAnimepaheByAnilist(id)
      .then((animepahe: Animepahe) => {
        if (animepahe && animepahe.episodes) {
          const paheEps = animepahe.episodes as AnimepaheEpisode[]
          const paheEp = paheEps.find((e: AnimepaheEpisode) => e.number === ep)
          if (paheEp) {
            paheProviders.push({
              id: paheEp.id,
              filler: false,
              provider: Provider.ANIMEPAHE,
              type: SourceType.BOTH,
            })
          }
        }
      })
      .catch(() => { })

    const animeKaiPromise = this.animekai.getAnimekaiByAnilist(id)
      .then((animeKai: AnimeKai) => {
        if (animeKai && animeKai.episodes) {
          const kaiEps = animeKai.episodes as AnimekaiEpisode[]
          const kaiEp = kaiEps.find((e: AnimekaiEpisode) => e.number === ep)
          if (kaiEp) {
            if (kaiEp.isSubbed) {
              kaiProviders.push({
                id: kaiEp.id,
                filler: kaiEp.isFiller || false,
                provider: Provider.ANIMEKAI,
                type: SourceType.HARD_SUB,
              })
            }
            if (kaiEp.isDubbed) {
              kaiProviders.push({
                id: kaiEp.id,
                filler: kaiEp.isFiller || false,
                provider: Provider.ANIMEKAI,
                type: SourceType.DUB,
              })
            }
          }
        }
      })
      .catch(() => { })

    await Promise.all([zoroPromise, animepahePromise, animeKaiPromise])

    return [...zoroProviders, ...paheProviders, ...kaiProviders]
  }

  async getProvidersMultiple(id: number): Promise<(Episode & { providers: ProviderInfo[] })[]> {
    const episodes = await this.getEpisodes(id)

    const enrichedEpisodes = await Promise.all(
      episodes.map(async (ep) => {
        const providers = await this.getProvidersSingle(id, ep.number)
        return {
          ...ep,
          providers,
        }
      })
    )

    return enrichedEpisodes
  }

  async getSources(provider: Provider, ep: number, alId: number, dub: boolean): Promise<Source> {
    const providers = await this.getProvidersSingle(alId, ep)
    const epId = providers.find(p => p.provider === provider)?.id;
    
    switch (provider) {
      case Provider.ANIWATCH: {
        const zoro = await this.aniwatch.getZoroByAnilist(alId).catch(() => null);
        if (zoro && zoro.episodes) {
          const zoroEps = zoro.episodes as EpisodeZoro[];
          const zoroEp = zoroEps.find(e => e.id === epId);
          if (zoroEp) {
            return await this.aniwatch.getSources(zoroEp.id, dub);
          }
        }
        break;
      }
      case Provider.ANIMEKAI: {
        const animeKai = await this.animekai.getAnimekaiByAnilist(alId).catch(() => null);
        if (animeKai && animeKai.episodes) {
          const kaiEps = animeKai.episodes as AnimekaiEpisode[];
          const kaiEp = kaiEps.find(e => e.id === epId);
          if (kaiEp) {
            return await this.animekai.getSources(kaiEp.id, dub);
          }
        }
        break;
      }
      case Provider.ANIMEPAHE: {
        const animepahe = await this.animepahe.getAnimepaheByAnilist(alId).catch(() => null);
        if (animepahe && animepahe.episodes) {
          const paheEps = animepahe.episodes as AnimepaheEpisode[];
          const paheEp = paheEps.find(e => e.id === epId);
          if (paheEp) {
            return await this.animepahe.getSources(paheEp.id);
          }
        }
        break;
      }
    }
    
    return Promise.reject(Error('No sources found'));
  }
}
