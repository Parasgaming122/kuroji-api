import { Injectable } from '@nestjs/common';
import { Provider } from '../model/Provider'
import { SourceType } from '../model/SourceType'
import { ZoroService } from '../../zoro/service/zoro.service'
import { AnimekaiService } from '../../animekai/service/animekai.service'
import { AnimepaheService } from '../../animepahe/service/animepahe.service'
import { AnilistService } from '../../anilist/service/anilist.service'
import { TmdbService } from '../../tmdb/service/tmdb.service'
import { AnilistStreamingEpisode, AnimekaiEpisode, AnimepaheEpisode, EpisodeZoro, TmdbSeasonEpisode, Zoro } from '@prisma/client'
import { Source } from '../model/Source'

export interface Episode {
  image: string,
  title: string,
  number: number,
  overview: string,
  date: string,
  filler: boolean,
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
      const [aniwatch, season, anilist] = await Promise.all([
        this.aniwatch.getZoroByAnilist(id).catch(() => null),
        this.tmdb.getTmdbSeasonByAnilist(id).catch(() => null),
        this.anilist.getAnilist(id).catch(() => null),
      ])

      const episodesZoro = aniwatch?.episodes as EpisodeZoro[] || []
      const tmdbEpisodes = season?.episodes as TmdbSeasonEpisode[] || []
      const anilistEpisodes = anilist?.streamingEpisodes as AnilistStreamingEpisode[] || []

      const episodes: Episode[] = episodesZoro.map((episode) => {
        const {
          isFiller: filler = false,
          isSubbed: sub = false,
          isDubbed: dub = false,
          number,
          title: zoroTitle,
        } = episode

        const tmdbEpisode = tmdbEpisodes.find(e => e.episode_number === number)

        const anilistEpisode = anilistEpisodes.find(e => {
          const match = e.title?.match(/.*?(\d+).*/)
          return match ? parseInt(match[1]) === number : false
        })

        return {
          title: tmdbEpisode?.name || anilistEpisode?.title || zoroTitle,
          image: tmdbEpisode?.still_path || anilistEpisode?.thumbnail || "",
          number,
          overview: tmdbEpisode?.overview ?? "",
          date: tmdbEpisode?.air_date ?? "",
          filler,
          sub,
          dub,
        }
      })

      return episodes
    } catch (e) {
      throw new Error(String(e))
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
    const providers: ProviderInfo[] = []

    const [zoro, pahe, kai] = await Promise.all([
      this.aniwatch.getZoroByAnilist(id).catch(() => null),
      this.animepahe.getAnimepaheByAnilist(id).catch(() => null),
      this.animekai.getAnimekaiByAnilist(id).catch(() => null),
    ])

    const pushProvider = (
      id: string,
      filler: boolean,
      provider: Provider,
      type: SourceType
    ) => {
      providers.push({ id, filler, provider, type })
    }

    const zoroEp = (zoro?.episodes as EpisodeZoro[])?.find((e: EpisodeZoro) => e.number === ep)
    if (zoroEp) {
      const { id, isFiller, isSubbed, isDubbed } = zoroEp
      if (isSubbed) pushProvider(id, isFiller, Provider.ANIWATCH, SourceType.SOFT_SUB)
      if (isDubbed) pushProvider(id, isFiller, Provider.ANIWATCH, SourceType.DUB)
    }

    const paheEp = (pahe?.episodes as AnimepaheEpisode[])?.find((e: AnimepaheEpisode) => e.number === ep)
    if (paheEp) {
      pushProvider(paheEp.id, false, Provider.ANIMEPAHE, SourceType.BOTH)
    }

    const kaiEp = (kai?.episodes as AnimekaiEpisode[])?.find((e: AnimekaiEpisode) => e.number === ep)
    if (kaiEp) {
      const { id, isFiller = false, isSubbed, isDubbed } = kaiEp
      if (isSubbed) pushProvider(id, false, Provider.ANIMEKAI, SourceType.HARD_SUB)
      if (isDubbed) pushProvider(id, false, Provider.ANIMEKAI, SourceType.DUB)
    }

    return providers
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
    const epId = providers.find(p => p.provider === provider)?.id
    if (!epId) throw new Error("Episode not found for provider")

    const fetchMap = {
      [Provider.ANIWATCH]: async () => this.aniwatch.getSources(epId, dub),
      [Provider.ANIMEKAI]: async () => this.animekai.getSources(epId, dub),
      [Provider.ANIMEPAHE]: async () => this.animepahe.getSources(epId),
    }

    const fetchFn = fetchMap[provider]
    if (!fetchFn) throw new Error("Invalid provider")

    try {
      return await fetchFn()
    } catch {
      throw new Error("No sources found")
    }
  }
}
