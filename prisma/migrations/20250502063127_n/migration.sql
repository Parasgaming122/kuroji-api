/*
  Warnings:

  - You are about to drop the column `episodes` on the `AnimeKai` table. All the data in the column will be lost.
  - You are about to drop the column `episodes` on the `Animepahe` table. All the data in the column will be lost.
  - You are about to drop the column `externalLinks` on the `Animepahe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnimeKai" DROP COLUMN "episodes";

-- AlterTable
ALTER TABLE "Animepahe" DROP COLUMN "episodes",
DROP COLUMN "externalLinks";

-- CreateTable
CREATE TABLE "_AnimekaiEpisode" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AnimekaiEpisode_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AnimepaheExLink" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AnimepaheExLink_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AnimepaheEpisode" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AnimepaheEpisode_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AnimekaiEpisode_B_index" ON "_AnimekaiEpisode"("B");

-- CreateIndex
CREATE INDEX "_AnimepaheExLink_B_index" ON "_AnimepaheExLink"("B");

-- CreateIndex
CREATE INDEX "_AnimepaheEpisode_B_index" ON "_AnimepaheEpisode"("B");

-- AddForeignKey
ALTER TABLE "_AnimekaiEpisode" ADD CONSTRAINT "_AnimekaiEpisode_A_fkey" FOREIGN KEY ("A") REFERENCES "AnimeKai"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimekaiEpisode" ADD CONSTRAINT "_AnimekaiEpisode_B_fkey" FOREIGN KEY ("B") REFERENCES "AnimekaiEpisode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimepaheExLink" ADD CONSTRAINT "_AnimepaheExLink_A_fkey" FOREIGN KEY ("A") REFERENCES "Animepahe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimepaheExLink" ADD CONSTRAINT "_AnimepaheExLink_B_fkey" FOREIGN KEY ("B") REFERENCES "AnimepaheExternalLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimepaheEpisode" ADD CONSTRAINT "_AnimepaheEpisode_A_fkey" FOREIGN KEY ("A") REFERENCES "Animepahe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimepaheEpisode" ADD CONSTRAINT "_AnimepaheEpisode_B_fkey" FOREIGN KEY ("B") REFERENCES "AnimepaheEpisode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
