-- CreateTable
CREATE TABLE "Tmdb" (
    "id" INTEGER NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "backdropPath" TEXT,
    "episodeRunTime" INTEGER[],
    "firstAirDate" TEXT,
    "homepage" TEXT,
    "inProduction" BOOLEAN,
    "lastAirDate" TEXT,
    "name" TEXT,
    "numberOfEpisodes" INTEGER,
    "numberOfSeasons" INTEGER,
    "originalLanguage" TEXT,
    "originalName" TEXT,
    "originCountry" TEXT[],
    "overview" TEXT,
    "popularity" DOUBLE PRECISION,
    "posterPath" TEXT,
    "tagline" TEXT,
    "status" TEXT,
    "type" TEXT,
    "voteAverage" DOUBLE PRECISION,
    "voteCount" INTEGER,

    CONSTRAINT "Tmdb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TmdbReleaseSeason" (
    "id" INTEGER NOT NULL,
    "airDate" TEXT,
    "episodeCount" INTEGER,
    "name" TEXT,
    "overview" TEXT,
    "posterPath" TEXT,
    "seasonNumber" INTEGER,
    "voteAverage" DOUBLE PRECISION,
    "tmdbId" INTEGER NOT NULL,

    CONSTRAINT "TmdbReleaseSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TmdbSeason" (
    "id" INTEGER NOT NULL,
    "airDate" TEXT,
    "showId" INTEGER,
    "name" TEXT,
    "overview" TEXT,
    "posterPath" TEXT,
    "seasonNumber" INTEGER,
    "voteAverage" DOUBLE PRECISION,

    CONSTRAINT "TmdbSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TmdbSeasonEpisode" (
    "id" INTEGER NOT NULL,
    "airDate" TEXT,
    "episodeNumber" INTEGER,
    "episodeType" TEXT,
    "name" TEXT,
    "overview" TEXT,
    "productionCode" TEXT,
    "runtime" INTEGER,
    "seasonNumber" INTEGER,
    "showId" INTEGER,
    "stillPath" TEXT,
    "voteAverage" DOUBLE PRECISION,
    "voteCount" INTEGER,
    "tmdbSeasonId" INTEGER NOT NULL,

    CONSTRAINT "TmdbSeasonEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tvdb" (
    "id" INTEGER NOT NULL,
    "type" TEXT,
    "name" TEXT,
    "slug" TEXT,
    "image" TEXT,
    "score" INTEGER,
    "runtime" INTEGER,
    "lastUpdated" TEXT,
    "year" TEXT,
    "nameTranslations" TEXT[],
    "overviewTranslations" TEXT[],

    CONSTRAINT "Tvdb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tvdb_aliases" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "language" TEXT,
    "tvdbId" INTEGER NOT NULL,

    CONSTRAINT "tvdb_aliases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tvdb_artworks" (
    "id" INTEGER NOT NULL,
    "height" INTEGER,
    "image" TEXT,
    "includesText" BOOLEAN,
    "language" TEXT,
    "score" INTEGER,
    "thumbnail" TEXT,
    "type" INTEGER,
    "width" INTEGER,
    "tvdbId" INTEGER NOT NULL,

    CONSTRAINT "tvdb_artworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tvdb_remote" (
    "id" TEXT NOT NULL,
    "type" INTEGER,
    "sourceName" TEXT,
    "tvdbId" INTEGER NOT NULL,

    CONSTRAINT "tvdb_remote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TmdbReleaseSeason" ADD CONSTRAINT "TmdbReleaseSeason_tmdbId_fkey" FOREIGN KEY ("tmdbId") REFERENCES "Tmdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TmdbSeasonEpisode" ADD CONSTRAINT "TmdbSeasonEpisode_tmdbSeasonId_fkey" FOREIGN KEY ("tmdbSeasonId") REFERENCES "TmdbSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tvdb_aliases" ADD CONSTRAINT "tvdb_aliases_tvdbId_fkey" FOREIGN KEY ("tvdbId") REFERENCES "Tvdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tvdb_artworks" ADD CONSTRAINT "tvdb_artworks_tvdbId_fkey" FOREIGN KEY ("tvdbId") REFERENCES "Tvdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tvdb_remote" ADD CONSTRAINT "tvdb_remote_tvdbId_fkey" FOREIGN KEY ("tvdbId") REFERENCES "Tvdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
