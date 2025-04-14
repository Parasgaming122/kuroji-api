import { Injectable } from '@nestjs/common';
import { Prisma, Tvdb, TvdbLogin, TvdbLanguageTranslation, TvdbLanguage } from '@prisma/client';

@Injectable()
export class TvdbHelper {
  getTvdbData(tvdb: Tvdb): Prisma.TvdbCreateInput {
    return {
      id: tvdb.id,
      tmdbId: tvdb.tmdbId ?? undefined,
      type: tvdb.type ?? undefined,
      name: tvdb.name ?? undefined,
      slug: tvdb.slug ?? undefined,
      image: tvdb.image ?? undefined,
      score: tvdb.score ?? undefined,
      runtime: tvdb.runtime ?? undefined,
      lastUpdated: tvdb.lastUpdated ?? undefined,
      year: tvdb.year ?? undefined,
      nameTranslations: tvdb.nameTranslations ?? [],
      overviewTranslations: tvdb.overviewTranslations ?? [],
      status: tvdb.status ?? {},
      aliases: tvdb.aliases ?? undefined,
      artworks: tvdb.artworks ?? undefined,
      remoteIds: tvdb.remoteIds ?? undefined,
      trailers: tvdb.trailers ?? undefined,
      airsDays: tvdb.airsDays ?? undefined,
      airsTime: tvdb.airsTime ?? undefined,
    };
  }

  getTvdbLoginData(tvdb: TvdbLogin): Prisma.TvdbLoginCreateInput {
    return {
      token: tvdb.token,
      createDate: tvdb.createDate ?? new Date(),
      expired: tvdb.expired ?? false,
    };
  }

  getTvdbLanguageTranslationData(translation: TvdbLanguageTranslation): Prisma.TvdbLanguageTranslationCreateInput {
    return {
      tvdbId: translation.tvdbId,
      name: translation.name ?? undefined,
      overview: translation.overview ?? undefined,
      isAlias: translation.isAlias ?? undefined,
      isPrimary: translation.isPrimary ?? undefined,
      language: translation.language ?? undefined,
      tagline: translation.tagline ?? undefined,
      aliases: translation.aliases ?? [],
    };
  }

  getTvdbLanguageData(language: TvdbLanguage): Prisma.TvdbLanguageCreateInput {
    return {
      id: language.id,
      name: language.name ?? undefined,
      nativeName: language.nativeName ?? undefined,
      shortCode: language.shortCode ?? undefined,
    };
  }
}
