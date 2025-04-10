-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_titleId_fkey";

-- AlterTable
ALTER TABLE "Anilist" ADD COLUMN     "title" JSONB;
