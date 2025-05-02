/*
  Warnings:

  - You are about to drop the column `episodes` on the `TmdbSeason` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TmdbSeason" DROP COLUMN "episodes";

-- CreateTable
CREATE TABLE "_TmdbSeasonEpisode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TmdbSeasonEpisode_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TmdbSeasonEpisode_B_index" ON "_TmdbSeasonEpisode"("B");

-- AddForeignKey
ALTER TABLE "_TmdbSeasonEpisode" ADD CONSTRAINT "_TmdbSeasonEpisode_A_fkey" FOREIGN KEY ("A") REFERENCES "TmdbSeason"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TmdbSeasonEpisode" ADD CONSTRAINT "_TmdbSeasonEpisode_B_fkey" FOREIGN KEY ("B") REFERENCES "TmdbSeasonEpisode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
