/*
  Warnings:

  - You are about to drop the column `episodes` on the `Zoro` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EpisodeZoro" ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "isFiller" DROP NOT NULL,
ALTER COLUMN "isSubbed" DROP NOT NULL,
ALTER COLUMN "isDubbed" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Zoro" DROP COLUMN "episodes";

-- CreateTable
CREATE TABLE "_EpisodeZoro" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EpisodeZoro_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EpisodeZoro_B_index" ON "_EpisodeZoro"("B");

-- AddForeignKey
ALTER TABLE "_EpisodeZoro" ADD CONSTRAINT "_EpisodeZoro_A_fkey" FOREIGN KEY ("A") REFERENCES "EpisodeZoro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EpisodeZoro" ADD CONSTRAINT "_EpisodeZoro_B_fkey" FOREIGN KEY ("B") REFERENCES "Zoro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
