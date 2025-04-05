/*
  Warnings:

  - You are about to drop the column `shikimoriId` on the `BasicRelease` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BasicRelease" DROP CONSTRAINT "BasicRelease_coverImageId_fkey";

-- DropForeignKey
ALTER TABLE "BasicRelease" DROP CONSTRAINT "BasicRelease_nextAiringEpisodeId_fkey";

-- DropForeignKey
ALTER TABLE "BasicRelease" DROP CONSTRAINT "BasicRelease_shikimoriId_fkey";

-- DropForeignKey
ALTER TABLE "BasicRelease" DROP CONSTRAINT "BasicRelease_startDateId_fkey";

-- DropForeignKey
ALTER TABLE "BasicRelease" DROP CONSTRAINT "BasicRelease_titleId_fkey";

-- AlterTable
ALTER TABLE "BasicRelease" DROP COLUMN "shikimoriId",
ADD COLUMN     "shikimori" JSONB,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "BasicRelease_id_seq";

-- CreateTable
CREATE TABLE "Release" (
    "id" INTEGER NOT NULL,
    "idMal" INTEGER,
    "siteUrl" TEXT,
    "titleId" INTEGER,
    "coverImageId" INTEGER,
    "bannerImage" TEXT,
    "status" TEXT,
    "type" TEXT,
    "format" TEXT,
    "updatedAt" INTEGER,
    "description" TEXT,
    "startDateId" INTEGER,
    "endDateId" INTEGER,
    "season" TEXT,
    "seasonYear" INTEGER,
    "episodes" INTEGER,
    "episodesAired" INTEGER,
    "duration" INTEGER,
    "countryOfOrigin" TEXT,
    "isLicensed" BOOLEAN,
    "source" TEXT,
    "hashtag" TEXT,
    "trailerId" INTEGER,
    "isLocked" BOOLEAN,
    "isAdult" BOOLEAN,
    "averageScore" INTEGER,
    "meanScore" INTEGER,
    "popularity" INTEGER,
    "trending" INTEGER,
    "favourites" INTEGER,
    "genres" TEXT[],
    "synonyms" TEXT[],
    "recommendations" JSONB,
    "recommendation" JSONB,
    "characters" JSONB,
    "studios" JSONB,
    "airingSchedule" JSONB,
    "nextAiringEpisodeId" INTEGER,
    "tags" JSONB,
    "externalLinks" JSONB,
    "streamingEpisodes" JSONB,
    "stats" JSONB,
    "comments" JSONB,
    "chronology" JSONB,
    "shikimori" JSONB,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseTitle" (
    "id" SERIAL NOT NULL,
    "romaji" TEXT,
    "english" TEXT,
    "nativeTitle" TEXT,

    CONSTRAINT "ReleaseTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseCoverImage" (
    "id" SERIAL NOT NULL,
    "extraLarge" TEXT,
    "large" TEXT,
    "medium" TEXT,
    "color" TEXT,

    CONSTRAINT "ReleaseCoverImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseDate" (
    "id" SERIAL NOT NULL,
    "year" INTEGER,
    "month" INTEGER,
    "day" INTEGER,

    CONSTRAINT "ReleaseDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseTrailer" (
    "id" SERIAL NOT NULL,
    "trailerId" TEXT,
    "site" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "ReleaseTrailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseAiringEpisode" (
    "id" SERIAL NOT NULL,
    "airingAt" INTEGER,
    "timeUntilAiring" INTEGER,
    "episode" INTEGER,
    "mediaId" INTEGER,
    "media" JSONB,

    CONSTRAINT "ReleaseAiringEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleRelease" (
    "id" INTEGER NOT NULL,
    "idMal" INTEGER,
    "siteUrl" TEXT,
    "titleId" INTEGER,
    "bannerImage" TEXT,
    "coverImageId" INTEGER,
    "episodes" INTEGER,
    "episodesAired" INTEGER,
    "averageScore" INTEGER,
    "meanScore" INTEGER,
    "isLocked" BOOLEAN,
    "isAdult" BOOLEAN,
    "nextAiringEpisodeId" INTEGER,
    "shikimori" JSONB,

    CONSTRAINT "ScheduleRelease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicReleaseShikimori" (
    "id" SERIAL NOT NULL,
    "idMal" INTEGER,
    "siteUrl" TEXT,
    "titleId" INTEGER,
    "synonyms" TEXT[],
    "bannerImage" TEXT,
    "coverImageId" INTEGER,
    "type" TEXT,
    "format" TEXT,
    "status" TEXT,
    "description" TEXT,
    "startDateId" INTEGER,
    "season" TEXT,
    "seasonYear" INTEGER,
    "episodes" INTEGER,
    "episodesAired" INTEGER,
    "duration" INTEGER,
    "countryOfOrigin" TEXT,
    "popularity" INTEGER,
    "favourites" INTEGER,
    "averageScore" INTEGER,
    "meanScore" INTEGER,
    "isLocked" BOOLEAN,
    "isAdult" BOOLEAN,
    "genres" TEXT[],
    "nextAiringEpisodeId" INTEGER,
    "shikimoriId" INTEGER,

    CONSTRAINT "BasicReleaseShikimori_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "ReleaseTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "ReleaseCoverImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_startDateId_fkey" FOREIGN KEY ("startDateId") REFERENCES "ReleaseDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_endDateId_fkey" FOREIGN KEY ("endDateId") REFERENCES "ReleaseDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_trailerId_fkey" FOREIGN KEY ("trailerId") REFERENCES "ReleaseTrailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_nextAiringEpisodeId_fkey" FOREIGN KEY ("nextAiringEpisodeId") REFERENCES "ReleaseAiringEpisode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleRelease" ADD CONSTRAINT "ScheduleRelease_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "ReleaseTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleRelease" ADD CONSTRAINT "ScheduleRelease_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "ReleaseCoverImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleRelease" ADD CONSTRAINT "ScheduleRelease_nextAiringEpisodeId_fkey" FOREIGN KEY ("nextAiringEpisodeId") REFERENCES "ReleaseAiringEpisode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicRelease" ADD CONSTRAINT "BasicRelease_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "ReleaseTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicRelease" ADD CONSTRAINT "BasicRelease_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "ReleaseCoverImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicRelease" ADD CONSTRAINT "BasicRelease_startDateId_fkey" FOREIGN KEY ("startDateId") REFERENCES "ReleaseDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicRelease" ADD CONSTRAINT "BasicRelease_nextAiringEpisodeId_fkey" FOREIGN KEY ("nextAiringEpisodeId") REFERENCES "ReleaseAiringEpisode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicReleaseShikimori" ADD CONSTRAINT "BasicReleaseShikimori_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicReleaseShikimori" ADD CONSTRAINT "BasicReleaseShikimori_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "CoverImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicReleaseShikimori" ADD CONSTRAINT "BasicReleaseShikimori_startDateId_fkey" FOREIGN KEY ("startDateId") REFERENCES "DateDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicReleaseShikimori" ADD CONSTRAINT "BasicReleaseShikimori_nextAiringEpisodeId_fkey" FOREIGN KEY ("nextAiringEpisodeId") REFERENCES "AiringEpisode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicReleaseShikimori" ADD CONSTRAINT "BasicReleaseShikimori_shikimoriId_fkey" FOREIGN KEY ("shikimoriId") REFERENCES "BasicShikimori"("id") ON DELETE SET NULL ON UPDATE CASCADE;
