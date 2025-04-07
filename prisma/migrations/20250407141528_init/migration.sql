/*
  Warnings:

  - You are about to drop the column `animeKaiId` on the `AnimekaiEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `animepaheId` on the `AnimepaheEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `BasicIdAni` table. All the data in the column will be lost.
  - You are about to drop the column `zoroId` on the `EpisodeZoro` table. All the data in the column will be lost.
  - You are about to drop the column `tvdbId` on the `tvdb_aliases` table. All the data in the column will be lost.
  - You are about to drop the column `tvdbId` on the `tvdb_artworks` table. All the data in the column will be lost.
  - You are about to drop the column `tvdbId` on the `tvdb_remote` table. All the data in the column will be lost.
  - You are about to drop the `tmdb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tmdb_release_season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tmdb_season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tmdb_season_episode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnilistExternalLink" DROP CONSTRAINT "AnilistExternalLink_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistStreamingEpisode" DROP CONSTRAINT "AnilistStreamingEpisode_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistTag" DROP CONSTRAINT "AnilistTag_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnimekaiEpisode" DROP CONSTRAINT "AnimekaiEpisode_animeKaiId_fkey";

-- DropForeignKey
ALTER TABLE "AnimepaheEpisode" DROP CONSTRAINT "AnimepaheEpisode_animepaheId_fkey";

-- DropForeignKey
ALTER TABLE "BasicIdAni" DROP CONSTRAINT "BasicIdAni_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "EpisodeZoro" DROP CONSTRAINT "EpisodeZoro_zoroId_fkey";

-- DropForeignKey
ALTER TABLE "tmdb_release_season" DROP CONSTRAINT "tmdb_release_season_tmdb_id_fkey";

-- DropForeignKey
ALTER TABLE "tmdb_season_episode" DROP CONSTRAINT "tmdb_season_episode_tmdb_season_id_fkey";

-- DropForeignKey
ALTER TABLE "tvdb_aliases" DROP CONSTRAINT "tvdb_aliases_tvdbId_fkey";

-- DropForeignKey
ALTER TABLE "tvdb_artworks" DROP CONSTRAINT "tvdb_artworks_tvdbId_fkey";

-- DropForeignKey
ALTER TABLE "tvdb_remote" DROP CONSTRAINT "tvdb_remote_tvdbId_fkey";

-- AlterTable
ALTER TABLE "Anilist" ADD COLUMN     "BasicIdAni" JSONB,
ADD COLUMN     "externalLinks" JSONB,
ADD COLUMN     "streamingEpisodes" JSONB,
ADD COLUMN     "tags" JSONB;

-- AlterTable
ALTER TABLE "AnimeKai" ADD COLUMN     "episodes" JSONB;

-- AlterTable
ALTER TABLE "AnimekaiEpisode" DROP COLUMN "animeKaiId";

-- AlterTable
ALTER TABLE "Animepahe" ADD COLUMN     "episodes" JSONB;

-- AlterTable
ALTER TABLE "AnimepaheEpisode" DROP COLUMN "animepaheId";

-- AlterTable
ALTER TABLE "BasicIdAni" DROP COLUMN "releaseId";

-- AlterTable
ALTER TABLE "EpisodeZoro" DROP COLUMN "zoroId";

-- AlterTable
ALTER TABLE "Tvdb" ADD COLUMN     "aliases" JSONB,
ADD COLUMN     "artworks" JSONB,
ADD COLUMN     "remoteIds" JSONB;

-- AlterTable
ALTER TABLE "Zoro" ADD COLUMN     "episodes" JSONB;

-- AlterTable
ALTER TABLE "tvdb_aliases" DROP COLUMN "tvdbId";

-- AlterTable
ALTER TABLE "tvdb_artworks" DROP COLUMN "tvdbId";

-- AlterTable
ALTER TABLE "tvdb_remote" DROP COLUMN "tvdbId";

-- DropTable
DROP TABLE "tmdb";

-- DropTable
DROP TABLE "tmdb_release_season";

-- DropTable
DROP TABLE "tmdb_season";

-- DropTable
DROP TABLE "tmdb_season_episode";

-- CreateTable
CREATE TABLE "ReleaseFilter" (
    "id" SERIAL NOT NULL,
    "sort" TEXT[],
    "perPage" INTEGER,
    "page" INTEGER,
    "sourceIn" TEXT[],
    "popularityLesser" INTEGER,
    "popularityGreater" INTEGER,
    "popularityNot" INTEGER,
    "averageScoreLesser" INTEGER,
    "averageScoreGreater" INTEGER,
    "averageScoreNot" INTEGER,
    "licensedByIdIn" TEXT[],
    "licensedByIn" TEXT[],
    "tagCategoryNotIn" TEXT[],
    "tagCategoryIn" TEXT[],
    "tagNotIn" TEXT[],
    "tagIn" TEXT[],
    "genreNotIn" TEXT[],
    "genreIn" TEXT[],
    "durationLesser" INTEGER,
    "durationGreater" INTEGER,
    "episodesLesser" INTEGER,
    "episodesGreater" INTEGER,
    "statusNotIn" TEXT[],
    "statusNot" TEXT,
    "statusIn" TEXT[],
    "formatNotIn" TEXT[],
    "formatNot" TEXT,
    "formatIn" TEXT[],
    "endDateLike" TEXT,
    "endDateLesser" TEXT,
    "endDateGreater" TEXT,
    "startDateLike" TEXT,
    "startDateLesser" TEXT,
    "startDateGreater" TEXT,
    "idMalNotIn" INTEGER[],
    "idMalIn" INTEGER[],
    "idMalNot" INTEGER,
    "idNotIn" INTEGER[],
    "idIn" INTEGER[],
    "idNot" INTEGER,
    "search" TEXT,
    "isLicensed" BOOLEAN,
    "countryOfOrigin" TEXT,
    "isAdult" BOOLEAN,
    "format" TEXT,
    "type" TEXT,
    "status" TEXT,
    "season" TEXT,
    "idMal" INTEGER,

    CONSTRAINT "ReleaseFilter_pkey" PRIMARY KEY ("id")
);

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
    "seasons" JSONB,

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
    "episodes" JSONB,

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

    CONSTRAINT "TmdbSeasonEpisode_pkey" PRIMARY KEY ("id")
);
