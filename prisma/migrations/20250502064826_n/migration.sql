/*
  Warnings:

  - You are about to drop the column `seasons` on the `Tmdb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tmdb" DROP COLUMN "seasons";

-- CreateTable
CREATE TABLE "_TmdbReleaseSeason" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TmdbReleaseSeason_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TmdbReleaseSeason_B_index" ON "_TmdbReleaseSeason"("B");

-- AddForeignKey
ALTER TABLE "_TmdbReleaseSeason" ADD CONSTRAINT "_TmdbReleaseSeason_A_fkey" FOREIGN KEY ("A") REFERENCES "Tmdb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TmdbReleaseSeason" ADD CONSTRAINT "_TmdbReleaseSeason_B_fkey" FOREIGN KEY ("B") REFERENCES "TmdbReleaseSeason"("id") ON DELETE CASCADE ON UPDATE CASCADE;
