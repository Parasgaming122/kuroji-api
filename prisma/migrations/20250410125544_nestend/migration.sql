/*
  Warnings:

  - You are about to drop the column `BasicIdAni` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the `AnilistDate` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Anilist" DROP COLUMN "BasicIdAni",
DROP COLUMN "coverImage",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "coverId" INTEGER,
ADD COLUMN     "endDateId" INTEGER,
ADD COLUMN     "startDateId" INTEGER;

-- DropTable
DROP TABLE "AnilistDate";

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

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "AnilistCover"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_startDateId_fkey" FOREIGN KEY ("startDateId") REFERENCES "StartDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_endDateId_fkey" FOREIGN KEY ("endDateId") REFERENCES "EndDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
