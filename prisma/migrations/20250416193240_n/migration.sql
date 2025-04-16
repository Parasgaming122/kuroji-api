/*
  Warnings:

  - You are about to drop the `AnilistScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnilistStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnilistScore" DROP CONSTRAINT "AnilistScore_anilistStatsId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistStats" DROP CONSTRAINT "AnilistStats_releaseId_fkey";

-- AlterTable
ALTER TABLE "Anilist" ADD COLUMN     "stats" JSONB;

-- DropTable
DROP TABLE "AnilistScore";

-- DropTable
DROP TABLE "AnilistStats";
