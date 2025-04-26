/*
  Warnings:

  - The `alternative` column on the `AnilistCharacterName` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `alternative` column on the `AnilistVoiceName` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AnilistCharacterName" DROP COLUMN "alternative",
ADD COLUMN     "alternative" TEXT[];

-- AlterTable
ALTER TABLE "AnilistVoiceName" DROP COLUMN "alternative",
ADD COLUMN     "alternative" TEXT[];
