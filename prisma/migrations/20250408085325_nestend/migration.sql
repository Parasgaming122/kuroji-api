/*
  Warnings:

  - The `tmdbId` column on the `Tvdb` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tvdb" DROP COLUMN "tmdbId",
ADD COLUMN     "tmdbId" INTEGER;
