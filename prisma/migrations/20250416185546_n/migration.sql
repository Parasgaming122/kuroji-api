/*
  Warnings:

  - You are about to drop the column `recommendations` on the `Anilist` table. All the data in the column will be lost.
  - You are about to drop the column `trailer` on the `Anilist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anilist" DROP COLUMN "recommendations",
DROP COLUMN "trailer",
ADD COLUMN     "trailerId" TEXT;

-- CreateTable
CREATE TABLE "AnilistTrailer" (
    "id" TEXT NOT NULL,
    "site" TEXT,
    "thumbnail" TEXT,

    CONSTRAINT "AnilistTrailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnilistRecs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnilistRecs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AnilistRecs_B_index" ON "_AnilistRecs"("B");

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_trailerId_fkey" FOREIGN KEY ("trailerId") REFERENCES "AnilistTrailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnilistRecs" ADD CONSTRAINT "_AnilistRecs_A_fkey" FOREIGN KEY ("A") REFERENCES "Anilist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnilistRecs" ADD CONSTRAINT "_AnilistRecs_B_fkey" FOREIGN KEY ("B") REFERENCES "BasicIdAni"("id") ON DELETE CASCADE ON UPDATE CASCADE;
