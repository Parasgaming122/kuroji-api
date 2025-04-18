/*
  Warnings:

  - You are about to drop the column `stats` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistAiringSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistCover` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistExternalLink` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistNextAiringEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistRanking` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistStreamingEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistStudio` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistTag` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistTitle` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `AnilistTrailer` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `EndDate` table. All the data in the column will be lost.
  - You are about to drop the column `releaseId` on the `StartDate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[anilistId]` on the table `AnilistCover` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[anilistId]` on the table `AnilistNextAiringEpisode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[anilistId]` on the table `AnilistTitle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[anilistId]` on the table `AnilistTrailer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[anilistId]` on the table `EndDate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[anilistId]` on the table `StartDate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `anilistId` to the `AnilistAiringSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `AnilistCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `AnilistCover` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `AnilistExternalLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `AnilistNextAiringEpisode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `AnilistRanking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `AnilistStreamingEpisode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `AnilistStudio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `AnilistTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `AnilistTitle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `AnilistTrailer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `EndDate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anilistId` to the `StartDate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AnilistAiringSchedule" DROP CONSTRAINT "AnilistAiringSchedule_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistCharacter" DROP CONSTRAINT "AnilistCharacter_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistCover" DROP CONSTRAINT "AnilistCover_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistExternalLink" DROP CONSTRAINT "AnilistExternalLink_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistNextAiringEpisode" DROP CONSTRAINT "AnilistNextAiringEpisode_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistRanking" DROP CONSTRAINT "AnilistRanking_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistStreamingEpisode" DROP CONSTRAINT "AnilistStreamingEpisode_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistStudio" DROP CONSTRAINT "AnilistStudio_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistTag" DROP CONSTRAINT "AnilistTag_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistTitle" DROP CONSTRAINT "AnilistTitle_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistTrailer" DROP CONSTRAINT "AnilistTrailer_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "EndDate" DROP CONSTRAINT "EndDate_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "StartDate" DROP CONSTRAINT "StartDate_releaseId_fkey";

-- DropIndex
DROP INDEX "AnilistCover_releaseId_key";

-- DropIndex
DROP INDEX "AnilistNextAiringEpisode_releaseId_key";

-- DropIndex
DROP INDEX "AnilistTitle_releaseId_key";

-- DropIndex
DROP INDEX "AnilistTrailer_releaseId_key";

-- DropIndex
DROP INDEX "EndDate_releaseId_key";

-- DropIndex
DROP INDEX "StartDate_releaseId_key";

-- AlterTable
ALTER TABLE "Anilist" DROP COLUMN "stats";

-- AlterTable
ALTER TABLE "AnilistAiringSchedule" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistCharacter" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistCover" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistExternalLink" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistNextAiringEpisode" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistRanking" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistStreamingEpisode" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistStudio" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistTag" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistTitle" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistTrailer" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EndDate" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StartDate" DROP COLUMN "releaseId",
ADD COLUMN     "anilistId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AnilistScoreDistribution" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "anilistId" INTEGER NOT NULL,

    CONSTRAINT "AnilistScoreDistribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistStatusDistribution" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "anilistId" INTEGER NOT NULL,

    CONSTRAINT "AnilistStatusDistribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnilistCover_anilistId_key" ON "AnilistCover"("anilistId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistNextAiringEpisode_anilistId_key" ON "AnilistNextAiringEpisode"("anilistId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistTitle_anilistId_key" ON "AnilistTitle"("anilistId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistTrailer_anilistId_key" ON "AnilistTrailer"("anilistId");

-- CreateIndex
CREATE UNIQUE INDEX "EndDate_anilistId_key" ON "EndDate"("anilistId");

-- CreateIndex
CREATE UNIQUE INDEX "StartDate_anilistId_key" ON "StartDate"("anilistId");

-- AddForeignKey
ALTER TABLE "AnilistTitle" ADD CONSTRAINT "AnilistTitle_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartDate" ADD CONSTRAINT "StartDate_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndDate" ADD CONSTRAINT "EndDate_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistCover" ADD CONSTRAINT "AnilistCover_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistCharacter" ADD CONSTRAINT "AnilistCharacter_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistTag" ADD CONSTRAINT "AnilistTag_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistExternalLink" ADD CONSTRAINT "AnilistExternalLink_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistStreamingEpisode" ADD CONSTRAINT "AnilistStreamingEpisode_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistStudio" ADD CONSTRAINT "AnilistStudio_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistAiringSchedule" ADD CONSTRAINT "AnilistAiringSchedule_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistNextAiringEpisode" ADD CONSTRAINT "AnilistNextAiringEpisode_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistRanking" ADD CONSTRAINT "AnilistRanking_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistTrailer" ADD CONSTRAINT "AnilistTrailer_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistScoreDistribution" ADD CONSTRAINT "AnilistScoreDistribution_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistStatusDistribution" ADD CONSTRAINT "AnilistStatusDistribution_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
