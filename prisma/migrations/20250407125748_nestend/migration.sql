/*
  Warnings:

  - You are about to drop the column `shikimoriId` on the `BasicIdShik` table. All the data in the column will be lost.
  - You are about to drop the column `shikimoriId` on the `Screenshot` table. All the data in the column will be lost.
  - You are about to drop the column `shikimoriId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `ReleaseFilter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tmdb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TmdbReleaseSeason` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TmdbSeason` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TmdbSeasonEpisode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chronology` to the `Shikimori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenshots` to the `Shikimori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videos` to the `Shikimori` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BasicIdShik" DROP CONSTRAINT "BasicIdShik_shikimoriId_fkey";

-- DropForeignKey
ALTER TABLE "BasicReleaseShikimori" DROP CONSTRAINT "BasicReleaseShikimori_coverImageId_fkey";

-- DropForeignKey
ALTER TABLE "BasicReleaseShikimori" DROP CONSTRAINT "BasicReleaseShikimori_nextAiringEpisodeId_fkey";

-- DropForeignKey
ALTER TABLE "BasicReleaseShikimori" DROP CONSTRAINT "BasicReleaseShikimori_shikimoriId_fkey";

-- DropForeignKey
ALTER TABLE "BasicReleaseShikimori" DROP CONSTRAINT "BasicReleaseShikimori_startDateId_fkey";

-- DropForeignKey
ALTER TABLE "BasicReleaseShikimori" DROP CONSTRAINT "BasicReleaseShikimori_titleId_fkey";

-- DropForeignKey
ALTER TABLE "BasicShikimori" DROP CONSTRAINT "BasicShikimori_posterId_fkey";

-- DropForeignKey
ALTER TABLE "Screenshot" DROP CONSTRAINT "Screenshot_shikimoriId_fkey";

-- DropForeignKey
ALTER TABLE "Shikimori" DROP CONSTRAINT "Shikimori_airedOnId_fkey";

-- DropForeignKey
ALTER TABLE "Shikimori" DROP CONSTRAINT "Shikimori_posterId_fkey";

-- DropForeignKey
ALTER TABLE "Shikimori" DROP CONSTRAINT "Shikimori_releasedOnId_fkey";

-- DropForeignKey
ALTER TABLE "TmdbReleaseSeason" DROP CONSTRAINT "TmdbReleaseSeason_tmdbId_fkey";

-- DropForeignKey
ALTER TABLE "TmdbSeasonEpisode" DROP CONSTRAINT "TmdbSeasonEpisode_tmdbSeasonId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_shikimoriId_fkey";

-- AlterTable
ALTER TABLE "BasicIdShik" DROP COLUMN "shikimoriId";

-- AlterTable
ALTER TABLE "BasicReleaseShikimori" ADD COLUMN     "coverImage" JSONB,
ADD COLUMN     "nextAiringEpisode" JSONB,
ADD COLUMN     "shikimori" JSONB,
ADD COLUMN     "startDate" JSONB,
ADD COLUMN     "title" JSONB;

-- AlterTable
ALTER TABLE "BasicShikimori" ADD COLUMN     "poster" JSONB;

-- AlterTable
ALTER TABLE "Screenshot" DROP COLUMN "shikimoriId";

-- AlterTable
ALTER TABLE "Shikimori" ADD COLUMN     "airedOn" JSONB,
ADD COLUMN     "chronology" JSONB NOT NULL,
ADD COLUMN     "poster" JSONB,
ADD COLUMN     "releasedOn" JSONB,
ADD COLUMN     "screenshots" JSONB NOT NULL,
ADD COLUMN     "videos" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "shikimoriId";

-- DropTable
DROP TABLE "ReleaseFilter";

-- DropTable
DROP TABLE "Tmdb";

-- DropTable
DROP TABLE "TmdbReleaseSeason";

-- DropTable
DROP TABLE "TmdbSeason";

-- DropTable
DROP TABLE "TmdbSeasonEpisode";

-- CreateTable
CREATE TABLE "tmdb" (
    "id" INTEGER NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "backdrop_path" TEXT,
    "episode_run_time" INTEGER[],
    "first_air_date" TEXT,
    "homepage" TEXT,
    "in_production" BOOLEAN,
    "last_air_date" TEXT,
    "name" TEXT,
    "number_of_episodes" INTEGER,
    "number_of_seasons" INTEGER,
    "original_language" TEXT,
    "original_name" TEXT,
    "origin_country" TEXT[],
    "overview" TEXT,
    "popularity" DOUBLE PRECISION,
    "poster_path" TEXT,
    "tagline" TEXT,
    "status" TEXT,
    "type" TEXT,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,

    CONSTRAINT "tmdb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tmdb_release_season" (
    "id" INTEGER NOT NULL,
    "air_date" TEXT,
    "episode_count" INTEGER,
    "name" TEXT,
    "overview" TEXT,
    "poster_path" TEXT,
    "season_number" INTEGER,
    "vote_average" DOUBLE PRECISION,
    "tmdb_id" INTEGER NOT NULL,

    CONSTRAINT "tmdb_release_season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tmdb_season" (
    "id" INTEGER NOT NULL,
    "air_date" TEXT,
    "show_id" INTEGER,
    "name" TEXT,
    "overview" TEXT,
    "poster_path" TEXT,
    "season_number" INTEGER,
    "vote_average" DOUBLE PRECISION,

    CONSTRAINT "tmdb_season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tmdb_season_episode" (
    "id" INTEGER NOT NULL,
    "air_date" TEXT,
    "episode_number" INTEGER,
    "episode_type" TEXT,
    "name" TEXT,
    "overview" TEXT,
    "production_code" TEXT,
    "runtime" INTEGER,
    "season_number" INTEGER,
    "show_id" INTEGER,
    "still_path" TEXT,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,
    "tmdb_season_id" INTEGER NOT NULL,

    CONSTRAINT "tmdb_season_episode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tmdb_release_season" ADD CONSTRAINT "tmdb_release_season_tmdb_id_fkey" FOREIGN KEY ("tmdb_id") REFERENCES "tmdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tmdb_season_episode" ADD CONSTRAINT "tmdb_season_episode_tmdb_season_id_fkey" FOREIGN KEY ("tmdb_season_id") REFERENCES "tmdb_season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
