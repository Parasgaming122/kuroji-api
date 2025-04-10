/*
  Warnings:

  - You are about to drop the column `title` on the `Anilist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anilist" DROP COLUMN "title",
ADD COLUMN     "titleId" INTEGER;

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "AnilistTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
