/*
  Warnings:

  - You are about to drop the column `tags` on the `Anilist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anilist" DROP COLUMN "tags";

-- AddForeignKey
ALTER TABLE "AnilistTag" ADD CONSTRAINT "AnilistTag_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
