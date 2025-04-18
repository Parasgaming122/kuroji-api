/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `AnilistAiringSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `AnilistCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `exLinkId` on the `AnilistExternalLink` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `AnilistTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnilistAiringSchedule" DROP COLUMN "scheduleId",
ADD COLUMN     "timeUntilAiring" INTEGER;

-- AlterTable
ALTER TABLE "AnilistCharacter" DROP COLUMN "characterId";

-- AlterTable
ALTER TABLE "AnilistExternalLink" DROP COLUMN "exLinkId";

-- AlterTable
ALTER TABLE "AnilistTag" DROP COLUMN "tagId";
