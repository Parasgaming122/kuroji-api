/*
  Warnings:

  - You are about to drop the column `airsDays` on the `Tvdb` table. All the data in the column will be lost.
  - You are about to drop the column `aliases` on the `Tvdb` table. All the data in the column will be lost.
  - You are about to drop the column `artworks` on the `Tvdb` table. All the data in the column will be lost.
  - You are about to drop the column `remoteIds` on the `Tvdb` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Tvdb` table. All the data in the column will be lost.
  - You are about to drop the column `trailers` on the `Tvdb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tvdb" DROP COLUMN "airsDays",
DROP COLUMN "aliases",
DROP COLUMN "artworks",
DROP COLUMN "remoteIds",
DROP COLUMN "status",
DROP COLUMN "trailers";

-- CreateTable
CREATE TABLE "TvdbStatus" (
    "id" INTEGER NOT NULL,
    "tvdbId" INTEGER NOT NULL,
    "name" TEXT,
    "recordType" TEXT,
    "keepUpdated" BOOLEAN,

    CONSTRAINT "TvdbStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvdbTrailer" (
    "id" INTEGER NOT NULL,
    "url" TEXT,
    "name" TEXT,
    "runtime" INTEGER,
    "language" TEXT,

    CONSTRAINT "TvdbTrailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvdbAirDays" (
    "id" SERIAL NOT NULL,
    "tvdbId" INTEGER NOT NULL,
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wednesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "sunday" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TvdbAirDays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TvdbAliases" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TvdbAliases_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TvdbArtworks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TvdbArtworks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TvdbRemote" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TvdbRemote_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TvdbTrailers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TvdbTrailers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "TvdbStatus_tvdbId_key" ON "TvdbStatus"("tvdbId");

-- CreateIndex
CREATE UNIQUE INDEX "TvdbAirDays_tvdbId_key" ON "TvdbAirDays"("tvdbId");

-- CreateIndex
CREATE INDEX "_TvdbAliases_B_index" ON "_TvdbAliases"("B");

-- CreateIndex
CREATE INDEX "_TvdbArtworks_B_index" ON "_TvdbArtworks"("B");

-- CreateIndex
CREATE INDEX "_TvdbRemote_B_index" ON "_TvdbRemote"("B");

-- CreateIndex
CREATE INDEX "_TvdbTrailers_B_index" ON "_TvdbTrailers"("B");

-- AddForeignKey
ALTER TABLE "TvdbStatus" ADD CONSTRAINT "TvdbStatus_tvdbId_fkey" FOREIGN KEY ("tvdbId") REFERENCES "Tvdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TvdbAirDays" ADD CONSTRAINT "TvdbAirDays_tvdbId_fkey" FOREIGN KEY ("tvdbId") REFERENCES "Tvdb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TvdbAliases" ADD CONSTRAINT "_TvdbAliases_A_fkey" FOREIGN KEY ("A") REFERENCES "Tvdb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TvdbAliases" ADD CONSTRAINT "_TvdbAliases_B_fkey" FOREIGN KEY ("B") REFERENCES "tvdb_aliases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TvdbArtworks" ADD CONSTRAINT "_TvdbArtworks_A_fkey" FOREIGN KEY ("A") REFERENCES "Tvdb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TvdbArtworks" ADD CONSTRAINT "_TvdbArtworks_B_fkey" FOREIGN KEY ("B") REFERENCES "tvdb_artworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TvdbRemote" ADD CONSTRAINT "_TvdbRemote_A_fkey" FOREIGN KEY ("A") REFERENCES "Tvdb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TvdbRemote" ADD CONSTRAINT "_TvdbRemote_B_fkey" FOREIGN KEY ("B") REFERENCES "tvdb_remote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TvdbTrailers" ADD CONSTRAINT "_TvdbTrailers_A_fkey" FOREIGN KEY ("A") REFERENCES "Tvdb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TvdbTrailers" ADD CONSTRAINT "_TvdbTrailers_B_fkey" FOREIGN KEY ("B") REFERENCES "TvdbTrailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
