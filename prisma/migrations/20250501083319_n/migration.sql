/*
  Warnings:

  - You are about to drop the column `isGeneralSpoiler` on the `AnilistTag` table. All the data in the column will be lost.
  - You are about to drop the column `isMediaSpoiler` on the `AnilistTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnilistTag" DROP COLUMN "isGeneralSpoiler",
DROP COLUMN "isMediaSpoiler",
ADD COLUMN     "isSpoiler" BOOLEAN;
