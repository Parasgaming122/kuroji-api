/*
  Warnings:

  - You are about to drop the column `backdropPath` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `episodeRunTime` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `firstAirDate` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `inProduction` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `lastAirDate` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfEpisodes` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfSeasons` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `originCountry` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `originalLanguage` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `posterPath` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `voteAverage` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `voteCount` on the `Tmdb` table. All the data in the column will be lost.
  - You are about to drop the column `airDate` on the `TmdbReleaseSeason` table. All the data in the column will be lost.
  - You are about to drop the column `episodeCount` on the `TmdbReleaseSeason` table. All the data in the column will be lost.
  - You are about to drop the column `posterPath` on the `TmdbReleaseSeason` table. All the data in the column will be lost.
  - You are about to drop the column `seasonNumber` on the `TmdbReleaseSeason` table. All the data in the column will be lost.
  - You are about to drop the column `voteAverage` on the `TmdbReleaseSeason` table. All the data in the column will be lost.
  - You are about to drop the column `airDate` on the `TmdbSeason` table. All the data in the column will be lost.
  - You are about to drop the column `posterPath` on the `TmdbSeason` table. All the data in the column will be lost.
  - You are about to drop the column `seasonNumber` on the `TmdbSeason` table. All the data in the column will be lost.
  - You are about to drop the column `showId` on the `TmdbSeason` table. All the data in the column will be lost.
  - You are about to drop the column `voteAverage` on the `TmdbSeason` table. All the data in the column will be lost.
  - You are about to drop the column `airDate` on the `TmdbSeasonEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `episodeNumber` on the `TmdbSeasonEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `episodeType` on the `TmdbSeasonEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `productionCode` on the `TmdbSeasonEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `seasonNumber` on the `TmdbSeasonEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `showId` on the `TmdbSeasonEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `stillPath` on the `TmdbSeasonEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `voteAverage` on the `TmdbSeasonEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `voteCount` on the `TmdbSeasonEpisode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shikimori" ALTER COLUMN "chronology" DROP NOT NULL,
ALTER COLUMN "screenshots" DROP NOT NULL,
ALTER COLUMN "videos" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tmdb" DROP COLUMN "backdropPath",
DROP COLUMN "episodeRunTime",
DROP COLUMN "firstAirDate",
DROP COLUMN "inProduction",
DROP COLUMN "lastAirDate",
DROP COLUMN "numberOfEpisodes",
DROP COLUMN "numberOfSeasons",
DROP COLUMN "originCountry",
DROP COLUMN "originalLanguage",
DROP COLUMN "originalName",
DROP COLUMN "posterPath",
DROP COLUMN "voteAverage",
DROP COLUMN "voteCount",
ADD COLUMN     "backdrop_path" TEXT,
ADD COLUMN     "episode_run_time" INTEGER[],
ADD COLUMN     "first_air_date" TEXT,
ADD COLUMN     "in_production" BOOLEAN,
ADD COLUMN     "last_air_date" TEXT,
ADD COLUMN     "number_of_episodes" INTEGER,
ADD COLUMN     "number_of_seasons" INTEGER,
ADD COLUMN     "origin_country" TEXT[],
ADD COLUMN     "original_language" TEXT,
ADD COLUMN     "original_name" TEXT,
ADD COLUMN     "poster_path" TEXT,
ADD COLUMN     "vote_average" DOUBLE PRECISION,
ADD COLUMN     "vote_count" INTEGER;

-- AlterTable
ALTER TABLE "TmdbReleaseSeason" DROP COLUMN "airDate",
DROP COLUMN "episodeCount",
DROP COLUMN "posterPath",
DROP COLUMN "seasonNumber",
DROP COLUMN "voteAverage",
ADD COLUMN     "air_date" TEXT,
ADD COLUMN     "episode_count" INTEGER,
ADD COLUMN     "poster_path" TEXT,
ADD COLUMN     "season_number" INTEGER,
ADD COLUMN     "vote_average" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TmdbSeason" DROP COLUMN "airDate",
DROP COLUMN "posterPath",
DROP COLUMN "seasonNumber",
DROP COLUMN "showId",
DROP COLUMN "voteAverage",
ADD COLUMN     "air_date" TEXT,
ADD COLUMN     "poster_path" TEXT,
ADD COLUMN     "season_number" INTEGER,
ADD COLUMN     "show_id" INTEGER,
ADD COLUMN     "vote_average" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TmdbSeasonEpisode" DROP COLUMN "airDate",
DROP COLUMN "episodeNumber",
DROP COLUMN "episodeType",
DROP COLUMN "productionCode",
DROP COLUMN "seasonNumber",
DROP COLUMN "showId",
DROP COLUMN "stillPath",
DROP COLUMN "voteAverage",
DROP COLUMN "voteCount",
ADD COLUMN     "air_date" TEXT,
ADD COLUMN     "episode_number" INTEGER,
ADD COLUMN     "episode_type" TEXT,
ADD COLUMN     "production_code" TEXT,
ADD COLUMN     "season_number" INTEGER,
ADD COLUMN     "show_id" INTEGER,
ADD COLUMN     "still_path" TEXT,
ADD COLUMN     "vote_average" DOUBLE PRECISION,
ADD COLUMN     "vote_count" INTEGER;
