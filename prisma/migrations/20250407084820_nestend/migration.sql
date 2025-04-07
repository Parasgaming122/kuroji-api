/*
  Warnings:

  - You are about to drop the `Episode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_animeKaiId_fkey";

-- DropTable
DROP TABLE "Episode";

-- CreateTable
CREATE TABLE "AnimekaiEpisode" (
    "id" TEXT NOT NULL,
    "number" INTEGER,
    "title" TEXT,
    "isFiller" BOOLEAN,
    "isSubbed" BOOLEAN,
    "isDubbed" BOOLEAN,
    "url" TEXT,
    "animeKaiId" TEXT NOT NULL,

    CONSTRAINT "AnimekaiEpisode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnimekaiEpisode" ADD CONSTRAINT "AnimekaiEpisode_animeKaiId_fkey" FOREIGN KEY ("animeKaiId") REFERENCES "AnimeKai"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
