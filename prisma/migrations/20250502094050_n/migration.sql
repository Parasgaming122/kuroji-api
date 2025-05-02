/*
  Warnings:

  - You are about to drop the column `vote_count` on the `TmdbReleaseSeason` table. All the data in the column will be lost.
  - You are about to drop the column `vote_count` on the `TmdbSeason` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TmdbReleaseSeason" DROP COLUMN "vote_count";

-- AlterTable
ALTER TABLE "TmdbSeason" DROP COLUMN "vote_count";
