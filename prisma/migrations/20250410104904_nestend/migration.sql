/*
  Warnings:

  - You are about to drop the column `coverImage` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Anilist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anilist" DROP COLUMN "coverImage",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "title",
ADD COLUMN     "coverId" INTEGER,
ADD COLUMN     "endDateId" INTEGER,
ADD COLUMN     "startDateId" INTEGER,
ADD COLUMN     "titleId" INTEGER;

-- CreateTable
CREATE TABLE "AnilistTitle" (
    "id" SERIAL NOT NULL,
    "romaji" TEXT,
    "english" TEXT,
    "native" TEXT,

    CONSTRAINT "AnilistTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StartDate" (
    "id" SERIAL NOT NULL,
    "day" INTEGER,
    "month" INTEGER,
    "year" INTEGER,

    CONSTRAINT "StartDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EndDate" (
    "id" SERIAL NOT NULL,
    "day" INTEGER,
    "month" INTEGER,
    "year" INTEGER,

    CONSTRAINT "EndDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistCover" (
    "id" SERIAL NOT NULL,
    "color" TEXT,
    "large" TEXT,
    "medium" TEXT,
    "extraLarge" TEXT,

    CONSTRAINT "AnilistCover_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "AnilistTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "AnilistCover"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_startDateId_fkey" FOREIGN KEY ("startDateId") REFERENCES "StartDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_endDateId_fkey" FOREIGN KEY ("endDateId") REFERENCES "EndDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
