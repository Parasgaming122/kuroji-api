/*
  Warnings:

  - You are about to drop the column `coverId` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `endDateId` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `startDateId` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `titleId` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the `EndDate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StartDate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_coverId_fkey";

-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_endDateId_fkey";

-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_startDateId_fkey";

-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_titleId_fkey";

-- AlterTable
ALTER TABLE "Anilist" DROP COLUMN "coverId",
DROP COLUMN "endDateId",
DROP COLUMN "startDateId",
DROP COLUMN "titleId",
ADD COLUMN     "coverImage" JSONB,
ADD COLUMN     "endDate" JSONB,
ADD COLUMN     "startDate" JSONB,
ADD COLUMN     "title" JSONB;

-- DropTable
DROP TABLE "EndDate";

-- DropTable
DROP TABLE "StartDate";

-- CreateTable
CREATE TABLE "AnilistDate" (
    "id" SERIAL NOT NULL,
    "day" INTEGER,
    "month" INTEGER,
    "year" INTEGER,

    CONSTRAINT "AnilistDate_pkey" PRIMARY KEY ("id")
);
