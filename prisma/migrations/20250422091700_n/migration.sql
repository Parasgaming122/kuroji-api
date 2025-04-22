-- DropForeignKey
ALTER TABLE "Shikimori" DROP CONSTRAINT "Shikimori_malId_fkey";

-- DropIndex
DROP INDEX "Anilist_idMal_key";

-- DropIndex
DROP INDEX "Shikimori_malId_key";

-- AlterTable
ALTER TABLE "Shikimori" ALTER COLUMN "malId" SET DATA TYPE TEXT;
