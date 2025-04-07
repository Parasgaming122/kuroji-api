import { Injectable } from '@nestjs/common';
import { TmdbHelper } from '../utils/tmdb-helper'
import { CustomHttpService } from '../../../http/http.service'
import { PrismaService } from '../../../prisma.service'
import { DateDetails, Tmdb, TmdbReleaseSeason, TmdbSeason, TmdbSeasonEpisode } from '@prisma/client'
import { TMDB } from '../../../configs/tmdb.config'
import { AnilistService, AnilistWithRelations } from '../../anilist/service/anilist.service'
import { ScrapeHelper } from '../../../scrapper/scrape-helper'
import { UpdateType } from '../../../shared/UpdateType'

export interface TmdbWithRelations extends Tmdb {
  
}

export interface TmdbSeasonWithRelations extends TmdbSeason {
  
}

export interface BasicTmdb {
  id: number;
  original_name: string;
  media_type: string;
  name: string;
}

export interface TmdbResponse {
  results: BasicTmdb[];
}

@Injectable()
export class TmdbService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly anilistService: AnilistService,
    private readonly customHttpService: CustomHttpService,
    private readonly helper: TmdbHelper,
  ) {}

  async getTmdbByAnilist(id: number): Promise<TmdbWithRelations> {
    try {
      return await this.findTmdb(id);
    } catch (error) {
      throw new Error(`Error getting TMDb by AniList ID: ${error.message}`);
    }
  }

  async getTmdbSeasonByAnilist(id: number): Promise<TmdbSeason> {
    try {
      const anilist = await this.anilistService.getAnilist(id);
      const tmdb = await this.findTmdb(id);

      const existTmdbSeason = tmdb.seasons as TmdbReleaseSeason[];

      if (!existTmdbSeason || existTmdbSeason.length === 0) {
        throw new Error(`No seasons found for TMDb ID: ${tmdb.id}`);
      }

      const anilistAirDate = anilist.startDate as DateDetails;
      const year = anilistAirDate.year;
      const month = anilistAirDate.month;
      const day = anilistAirDate.day;
      const anilistAirDateString = `${year!!.toString().padStart(4, '0')}-${month!!.toString().padStart(2, '0')}-${day!!.toString().padStart(2, '0')}`;

      let seasonNumber = existTmdbSeason.find(
        (season) =>
          season.airDate?.toLowerCase() === anilistAirDateString.toLowerCase(),
      )?.seasonNumber;

      if (!seasonNumber) {
        const MAX_SEASONS = tmdb.numberOfSeasons || 1;
        for (let currentSeason = 1; currentSeason <= MAX_SEASONS; currentSeason++) {
          const tmdbSeason = await this.fetchTmdbSeason(tmdb.id, currentSeason);
          const tmdbSeasonEpisode = tmdbSeason.episodes as TmdbSeasonEpisode[];
          if (!tmdbSeasonEpisode || !tmdbSeasonEpisode || tmdbSeasonEpisode.length === 0) {
            break;
          }

          // Deep clone the season
          const clonedTmdbSeason: TmdbSeasonWithRelations = JSON.parse(JSON.stringify(tmdbSeason));
          const targetEpisodes: TmdbSeasonEpisode[] = [];
          const allEpisodes = clonedTmdbSeason.episodes as TmdbSeasonEpisode[];
          let startIndex = -1;

          for (let i = 0; i < allEpisodes.length; i++) {
            const episode = allEpisodes[i];
            if (episode.episodeType === 'finale') {
              if (i + 1 < allEpisodes.length &&
                  allEpisodes[i + 1].airDate === anilistAirDateString) {
                startIndex = i + 1;
                break;
              }
            }
          }

          if (startIndex !== -1) {
            for (let i = startIndex; i < allEpisodes.length; i++) {
              const episode = allEpisodes[i];
              const clonedEpisode = { ...episode, episode_number: targetEpisodes.length + 1 };
              targetEpisodes.push(clonedEpisode);
              if (episode.episodeType === 'finale') {
                break;
              }
            }
            clonedTmdbSeason.episodes = targetEpisodes;
            clonedTmdbSeason.showId = tmdb.id;
            const savedSeason = await this.saveTmdbSeason(clonedTmdbSeason);
            return savedSeason;
          }
        }
        throw new Error(
          `Could not find matching season for release date: ${anilistAirDateString}`,
        );
      }

      let tmdbSeason = await this.prisma.tmdbSeason.findFirst({ where: { showId: tmdb.id } });
      if (!tmdbSeason) {
        const newTmdbSeason = await this.fetchTmdbSeason(tmdb.id, seasonNumber);
        newTmdbSeason.showId = tmdb.id;
        tmdbSeason = await this.saveTmdbSeason(newTmdbSeason);
      }
      return tmdbSeason;
    } catch (error) {
      throw new Error(`Error getting TMDb season by AniList ID: ${error.message}`);
    }
  }

  async saveTmdb(tmdb: TmdbWithRelations): Promise<TmdbWithRelations> {
    await this.prisma.lastUpdated.create({
      data: { 
        entityId: String(tmdb.id), 
        type: UpdateType.TMDB 
      },
    });

    return this.prisma.tmdb.upsert({
      where: { id: tmdb.id },
      update: this.helper.getTmdbData(tmdb),
      create: this.helper.getTmdbData(tmdb),
    });
  }

  async saveTmdbSeason(tmdbSeason: TmdbSeasonWithRelations): Promise<TmdbSeason> {
    return this.prisma.tmdbSeason.upsert({
      where: { id: tmdbSeason.id },
      update: this.helper.getTmdbSeasonData(tmdbSeason),
      create: this.helper.getTmdbSeasonData(tmdbSeason),
    });
  }

  async fetchTmdb(id: number, type: string): Promise<TmdbWithRelations> {
    const url = type === 'tv' ? TMDB.getTvDetails(id) : TMDB.getMovieDetails(id);
    return this.customHttpService.getResponse(url)
  }

  async fetchTmdbSeason(id: number, seasonNumber: number): Promise<TmdbSeasonWithRelations> {
    return this.customHttpService.getResponse(TMDB.getSeasonDetails(id, seasonNumber))
  }

  async searchTmdb(query: string): Promise<TmdbResponse> {
    return this.customHttpService.getResponse(TMDB.multiSearch(query))
  }

  async findTmdb(id: number): Promise<TmdbWithRelations> {
    const tmdb = await this.findMatchInPrisma(id);
    if (tmdb) return tmdb;
    return this.fetchTmdbByAnilist(id);
  }

  async findMatchInPrisma(id: number): Promise<TmdbWithRelations> {
    const anilist = await this.anilistService.getAnilist(id);

    let match = await this.prisma.tmdb.findFirst({
      where: { 
        name: { 
          equals: (anilist.title as { romaji: string }).romaji, 
          mode: 'insensitive' 
        } 
      },
    });
    if (match && this.isTitleMatch(anilist, match as TmdbWithRelations)) {
      return match as TmdbWithRelations;
    }

    match = await this.prisma.tmdb.findFirst({
      where: { 
        originalName: { 
          equals: (anilist.title as { native: string }).native, 
          mode: 'insensitive' 
        } 
      },
    });
    if (match && this.isTitleMatch(anilist, match as TmdbWithRelations)) {
      return match as TmdbWithRelations;
    }

    const candidatesRomaji = await this.prisma.tmdb.findMany({
      where: { 
        name: { 
          contains: (anilist.title as { romaji: string }).romaji, 
          mode: 'insensitive' 
        } 
      },
    });
    
    let candidates = candidatesRomaji;
    if ((anilist.title as { english: string }).english) {
      const candidatesEnglish = await this.prisma.tmdb.findMany({
        where: { 
          name: { 
            contains: (anilist.title as { english: string }).english, 
            mode: 'insensitive' 
          } 
        },
      });
      candidates = candidates.concat(candidatesEnglish);
    }

    const candidatesNative = await this.prisma.tmdb.findMany({
      where: { 
        originalName: { 
          contains: (anilist.title as { native: string }).native, 
          mode: 'insensitive' 
        } 
      },
    });
    candidates = candidates.concat(candidatesNative);
    
    return this.findBestMatchFromCandidates(anilist, candidates as TmdbWithRelations[]) as TmdbWithRelations;
  }

  isTitleMatch(anilist: AnilistWithRelations, tmdb: TmdbWithRelations): boolean {
    return ScrapeHelper.compareTitles(
      (anilist.title as { romaji: string }).romaji,
      (anilist.title as { english: string }).english,
      (anilist.title as { native: string }).native,
      anilist.synonyms,
      tmdb.name!!,
      tmdb.originalName!!,
    );
  }

  findBestMatchFromCandidates(
    anilist: AnilistWithRelations,
    candidates: TmdbWithRelations[],
  ): TmdbWithRelations | null {
    return candidates.find((tmdb) => this.isTitleMatch(anilist, tmdb)) || null;
  }

  async fetchTmdbByAnilist(id: number): Promise<TmdbWithRelations> {
    const anilist = await this.anilistService.getAnilist(id);

    let searchResults = await this.searchTmdb(ScrapeHelper.normalizeTitle((anilist.title as { romaji: string }).romaji));
    let bestMatch = this.findBestMatchFromSearch(anilist, searchResults.results);
    if (!bestMatch && (anilist.title as { english: string }).english) {
      searchResults = await this.searchTmdb((anilist.title as { english: string }).english);
      bestMatch = this.findBestMatchFromSearch(anilist, searchResults.results);
    }
    if (!bestMatch) {
      throw new Error('No matching TMDb entry found');
    }
    const fetchedTmdb = await this.fetchTmdb(bestMatch.id, bestMatch.media_type);
    return this.saveTmdb(fetchedTmdb);
  }

  findBestMatchFromSearch(anilist: AnilistWithRelations, results: BasicTmdb[]): BasicTmdb | null {
    return (
      results.find((result) =>
        ScrapeHelper.compareTitles(
          (anilist.title as { romaji: string }).romaji,
          (anilist.title as { english: string }).english,
          (anilist.title as { native: string }).native,
          anilist.synonyms,
          result.name,
          result.original_name
        ),
      ) || null
    );
  }

  async detectType(id: number): Promise<string> {
    try {
      await this.customHttpService.getResponse(TMDB.getTvDetails(id));
      return 'tv';
    } catch (e1) {
      try {
        await this.customHttpService.getResponse(TMDB.getMovieDetails(id));
        return 'movie';
      } catch (e2) {
        throw new Error('ID not found in TMDb as Movie or TV Show.');
      }
    }
  }
}
