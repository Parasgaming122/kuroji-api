/*
  Warnings:

  - You are about to drop the column `airedOn` on the `Shikimori` table. All the data in the column will be lost.
  - You are about to drop the column `chronology` on the `Shikimori` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Shikimori` table. All the data in the column will be lost.
  - You are about to drop the column `releasedOn` on the `Shikimori` table. All the data in the column will be lost.
  - You are about to drop the column `screenshots` on the `Shikimori` table. All the data in the column will be lost.
  - You are about to drop the column `videos` on the `Shikimori` table. All the data in the column will be lost.
  - You are about to drop the `AiringEpisode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BasicShikimori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoverImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Poster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Screenshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[shikimoriId]` on the table `AiredOn` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shikimoriId]` on the table `ReleasedOn` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shikimoriId` to the `AiredOn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shikimoriId` to the `ReleasedOn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AiredOn" ADD COLUMN     "shikimoriId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BasicIdShik" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "BasicIdShik_id_seq";

-- AlterTable
ALTER TABLE "ReleasedOn" ADD COLUMN     "shikimoriId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shikimori" DROP COLUMN "airedOn",
DROP COLUMN "chronology",
DROP COLUMN "poster",
DROP COLUMN "releasedOn",
DROP COLUMN "screenshots",
DROP COLUMN "videos";

-- DropTable
DROP TABLE "AiringEpisode";

-- DropTable
DROP TABLE "BasicShikimori";

-- DropTable
DROP TABLE "CoverImage";

-- DropTable
DROP TABLE "Poster";

-- DropTable
DROP TABLE "Screenshot";

-- DropTable
DROP TABLE "Video";

-- CreateTable
CREATE TABLE "ShikimoriVideo" (
    "id" TEXT NOT NULL,
    "videoId" TEXT,
    "videoImageUrl" TEXT,
    "kind" TEXT,
    "videoName" TEXT,
    "playerUrl" TEXT,
    "videoUrl" TEXT,

    CONSTRAINT "ShikimoriVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShikimoriScreenshot" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT,
    "x166Url" TEXT,
    "x332Url" TEXT,

    CONSTRAINT "ShikimoriScreenshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShikimoriPoster" (
    "id" TEXT NOT NULL,
    "shikimoriId" TEXT NOT NULL,
    "originalUrl" TEXT,
    "mainUrl" TEXT,

    CONSTRAINT "ShikimoriPoster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ShikimoriVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ShikimoriVideo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ShikimoriScreenshot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ShikimoriScreenshot_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ShikimoriChronology" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ShikimoriChronology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShikimoriPoster_shikimoriId_key" ON "ShikimoriPoster"("shikimoriId");

-- CreateIndex
CREATE INDEX "_ShikimoriVideo_B_index" ON "_ShikimoriVideo"("B");

-- CreateIndex
CREATE INDEX "_ShikimoriScreenshot_B_index" ON "_ShikimoriScreenshot"("B");

-- CreateIndex
CREATE INDEX "_ShikimoriChronology_B_index" ON "_ShikimoriChronology"("B");

-- CreateIndex
CREATE UNIQUE INDEX "AiredOn_shikimoriId_key" ON "AiredOn"("shikimoriId");

-- CreateIndex
CREATE UNIQUE INDEX "ReleasedOn_shikimoriId_key" ON "ReleasedOn"("shikimoriId");

-- AddForeignKey
ALTER TABLE "AiredOn" ADD CONSTRAINT "AiredOn_shikimoriId_fkey" FOREIGN KEY ("shikimoriId") REFERENCES "Shikimori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleasedOn" ADD CONSTRAINT "ReleasedOn_shikimoriId_fkey" FOREIGN KEY ("shikimoriId") REFERENCES "Shikimori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShikimoriPoster" ADD CONSTRAINT "ShikimoriPoster_shikimoriId_fkey" FOREIGN KEY ("shikimoriId") REFERENCES "Shikimori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShikimoriVideo" ADD CONSTRAINT "_ShikimoriVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Shikimori"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShikimoriVideo" ADD CONSTRAINT "_ShikimoriVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "ShikimoriVideo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShikimoriScreenshot" ADD CONSTRAINT "_ShikimoriScreenshot_A_fkey" FOREIGN KEY ("A") REFERENCES "Shikimori"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShikimoriScreenshot" ADD CONSTRAINT "_ShikimoriScreenshot_B_fkey" FOREIGN KEY ("B") REFERENCES "ShikimoriScreenshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShikimoriChronology" ADD CONSTRAINT "_ShikimoriChronology_A_fkey" FOREIGN KEY ("A") REFERENCES "BasicIdShik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShikimoriChronology" ADD CONSTRAINT "_ShikimoriChronology_B_fkey" FOREIGN KEY ("B") REFERENCES "Shikimori"("id") ON DELETE CASCADE ON UPDATE CASCADE;
