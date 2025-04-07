/*
  Warnings:

  - You are about to drop the `Ids` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Ids";

-- CreateTable
CREATE TABLE "Animepahe" (
    "id" TEXT NOT NULL,
    "alId" INTEGER,
    "title" TEXT,
    "image" TEXT,
    "cover" TEXT,
    "hasSub" BOOLEAN,
    "status" TEXT,
    "type" TEXT,
    "releaseDate" TEXT,
    "totalEpisodes" INTEGER,
    "episodePages" INTEGER,

    CONSTRAINT "Animepahe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimepaheEpisode" (
    "id" TEXT NOT NULL,
    "number" INTEGER,
    "title" TEXT,
    "image" TEXT,
    "duration" TEXT,
    "url" TEXT,
    "animepaheId" TEXT NOT NULL,

    CONSTRAINT "AnimepaheEpisode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnimepaheEpisode" ADD CONSTRAINT "AnimepaheEpisode_animepaheId_fkey" FOREIGN KEY ("animepaheId") REFERENCES "Animepahe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
