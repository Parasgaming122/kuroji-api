/*
  Warnings:

  - The `malId` column on the `Shikimori` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[idMal]` on the table `Anilist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[malId]` on the table `Shikimori` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Shikimori" DROP COLUMN "malId",
ADD COLUMN     "malId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Anilist_idMal_key" ON "Anilist"("idMal");

-- CreateIndex
CREATE UNIQUE INDEX "Shikimori_malId_key" ON "Shikimori"("malId");

-- AddForeignKey
ALTER TABLE "Shikimori" ADD CONSTRAINT "Shikimori_malId_fkey" FOREIGN KEY ("malId") REFERENCES "Anilist"("idMal") ON DELETE SET NULL ON UPDATE CASCADE;
