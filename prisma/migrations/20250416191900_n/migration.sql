/*
  Warnings:

  - You are about to drop the column `coverId` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `endDateId` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `startDateId` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `stats` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `titleId` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `trailerId` on the `Anilist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[releaseId]` on the table `AnilistCover` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[releaseId]` on the table `AnilistTitle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[releaseId]` on the table `AnilistTrailer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[releaseId]` on the table `EndDate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[releaseId]` on the table `StartDate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `releaseId` to the `AnilistCover` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseId` to the `AnilistTitle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseId` to the `AnilistTrailer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseId` to the `EndDate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseId` to the `StartDate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_coverId_fkey";

-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_endDateId_fkey";

-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_startDateId_fkey";

-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_titleId_fkey";

-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_trailerId_fkey";

-- AlterTable
ALTER TABLE "Anilist" DROP COLUMN "coverId",
DROP COLUMN "endDateId",
DROP COLUMN "startDateId",
DROP COLUMN "stats",
DROP COLUMN "titleId",
DROP COLUMN "trailerId";

-- AlterTable
ALTER TABLE "AnilistCover" ADD COLUMN     "releaseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistTitle" ADD COLUMN     "releaseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnilistTrailer" ADD COLUMN     "releaseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BasicIdAni" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "BasicIdAni_id_seq";

-- AlterTable
ALTER TABLE "EndDate" ADD COLUMN     "releaseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StartDate" ADD COLUMN     "releaseId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AnilistStats" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,

    CONSTRAINT "AnilistStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistScore" (
    "id" SERIAL NOT NULL,
    "anilistStatsId" INTEGER NOT NULL,
    "score" INTEGER,
    "amount" INTEGER,

    CONSTRAINT "AnilistScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnilistStats_releaseId_key" ON "AnilistStats"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistScore_anilistStatsId_key" ON "AnilistScore"("anilistStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistCover_releaseId_key" ON "AnilistCover"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistTitle_releaseId_key" ON "AnilistTitle"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistTrailer_releaseId_key" ON "AnilistTrailer"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "EndDate_releaseId_key" ON "EndDate"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "StartDate_releaseId_key" ON "StartDate"("releaseId");

-- AddForeignKey
ALTER TABLE "AnilistTitle" ADD CONSTRAINT "AnilistTitle_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartDate" ADD CONSTRAINT "StartDate_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndDate" ADD CONSTRAINT "EndDate_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistCover" ADD CONSTRAINT "AnilistCover_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistTrailer" ADD CONSTRAINT "AnilistTrailer_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistStats" ADD CONSTRAINT "AnilistStats_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistScore" ADD CONSTRAINT "AnilistScore_anilistStatsId_fkey" FOREIGN KEY ("anilistStatsId") REFERENCES "AnilistStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
