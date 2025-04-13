import { Injectable } from '@nestjs/common';
import { Prisma, Tvdb, TvdbLogin } from '@prisma/client';

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
    };
  }

  getTvdbLoginData(tvdb: TvdbLogin): Prisma.TvdbLoginCreateInput {
    return {
      token: tvdb.token,
      createDate: tvdb.createDate ?? new Date(),
      expired: tvdb.expired ?? false,
    };
  }
}
