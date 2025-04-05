/*
  Warnings:

  - You are about to drop the `BasicId` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BasicRelease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Release` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReleaseAiringEpisode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReleaseCoverImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReleaseDate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReleaseTitle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReleaseTrailer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduleRelease` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BasicId" DROP CONSTRAINT "BasicId_shikimoriId_fkey";

-- DropForeignKey
ALTER TABLE "BasicRelease" DROP CONSTRAINT "BasicRelease_coverImageId_fkey";

-- DropForeignKey
ALTER TABLE "BasicRelease" DROP CONSTRAINT "BasicRelease_nextAiringEpisodeId_fkey";

-- DropForeignKey
ALTER TABLE "BasicRelease" DROP CONSTRAINT "BasicRelease_startDateId_fkey";

-- DropForeignKey
ALTER TABLE "BasicRelease" DROP CONSTRAINT "BasicRelease_titleId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_coverImageId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_endDateId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_nextAiringEpisodeId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_startDateId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_titleId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_trailerId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleRelease" DROP CONSTRAINT "ScheduleRelease_coverImageId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleRelease" DROP CONSTRAINT "ScheduleRelease_nextAiringEpisodeId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleRelease" DROP CONSTRAINT "ScheduleRelease_titleId_fkey";

-- DropTable
DROP TABLE "BasicId";

-- DropTable
DROP TABLE "BasicRelease";

-- DropTable
DROP TABLE "Release";

-- DropTable
DROP TABLE "ReleaseAiringEpisode";

-- DropTable
DROP TABLE "ReleaseCoverImage";

-- DropTable
DROP TABLE "ReleaseDate";

-- DropTable
DROP TABLE "ReleaseTitle";

-- DropTable
DROP TABLE "ReleaseTrailer";

-- DropTable
DROP TABLE "ScheduleRelease";

-- CreateTable
CREATE TABLE "Anilist" (
    "id" INTEGER NOT NULL,
    "idMal" INTEGER,
    "siteUrl" TEXT,
    "title" JSONB,
    "coverImage" JSONB,
    "bannerImage" TEXT,
    "status" TEXT,
    "type" TEXT,
    "format" TEXT,
    "updatedAt" INTEGER,
    "description" TEXT,
    "startDate" JSONB,
    "endDate" JSONB,
    "season" TEXT,
    "seasonYear" INTEGER,
    "episodes" INTEGER,
    "duration" INTEGER,
    "countryOfOrigin" TEXT,
    "isLicensed" BOOLEAN,
    "source" TEXT,
    "hashtag" TEXT,
    "trailer" JSONB,
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
    "characters" JSONB,
    "studios" JSONB,
    "airingSchedule" JSONB,
    "nextAiringEpisode" JSONB,
    "stats" JSONB,

    CONSTRAINT "Anilist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistTag" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "tagId" INTEGER,
    "name" TEXT,
    "description" TEXT,
    "category" TEXT,
    "rank" INTEGER,
    "isGeneralSpoiler" BOOLEAN,
    "isMediaSpoiler" BOOLEAN,
    "isAdult" BOOLEAN,
    "userId" INTEGER,

    CONSTRAINT "AnilistTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistExternalLink" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "exLinkId" INTEGER,
    "url" TEXT,
    "site" TEXT,
    "siteId" INTEGER,
    "type" TEXT,
    "language" TEXT,
    "color" TEXT,
    "icon" TEXT,
    "notes" TEXT,
    "isDisabled" BOOLEAN,

    CONSTRAINT "AnilistExternalLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistStreamingEpisode" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "title" TEXT,
    "thumbnail" TEXT,
    "url" TEXT,
    "site" TEXT,

    CONSTRAINT "AnilistStreamingEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicIdAni" (
    "id" SERIAL NOT NULL,
    "idMal" INTEGER,
    "releaseId" INTEGER,

    CONSTRAINT "BasicIdAni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicIdShik" (
    "id" SERIAL NOT NULL,
    "idMal" INTEGER,
    "shikimoriId" TEXT,

    CONSTRAINT "BasicIdShik_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnilistTag" ADD CONSTRAINT "AnilistTag_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistExternalLink" ADD CONSTRAINT "AnilistExternalLink_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistStreamingEpisode" ADD CONSTRAINT "AnilistStreamingEpisode_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicIdAni" ADD CONSTRAINT "BasicIdAni_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicIdShik" ADD CONSTRAINT "BasicIdShik_shikimoriId_fkey" FOREIGN KEY ("shikimoriId") REFERENCES "Shikimori"("id") ON DELETE SET NULL ON UPDATE CASCADE;
