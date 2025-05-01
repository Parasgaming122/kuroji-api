/*
  Warnings:

  - You are about to drop the column `anilistId` on the `AnilistCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `AnilistCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `anilistId` on the `AnilistStudio` table. All the data in the column will be lost.
  - You are about to drop the column `isMain` on the `AnilistStudio` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnilistCharacter" DROP CONSTRAINT "AnilistCharacter_anilistId_fkey";

-- DropForeignKey
ALTER TABLE "AnilistStudio" DROP CONSTRAINT "AnilistStudio_anilistId_fkey";

-- AlterTable
ALTER TABLE "AnilistCharacter" DROP COLUMN "anilistId",
DROP COLUMN "role";

-- AlterTable
ALTER TABLE "AnilistStudio" DROP COLUMN "anilistId",
DROP COLUMN "isMain";

-- CreateTable
CREATE TABLE "AnilistCharacterEdge" (
    "id" SERIAL NOT NULL,
    "anilistId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "role" TEXT,

    CONSTRAINT "AnilistCharacterEdge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistStudioEdge" (
    "id" SERIAL NOT NULL,
    "anilistId" INTEGER NOT NULL,
    "studioId" INTEGER NOT NULL,
    "isMain" BOOLEAN,

    CONSTRAINT "AnilistStudioEdge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnilistCharacterEdge_anilistId_characterId_key" ON "AnilistCharacterEdge"("anilistId", "characterId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistStudioEdge_anilistId_studioId_key" ON "AnilistStudioEdge"("anilistId", "studioId");

-- AddForeignKey
ALTER TABLE "AnilistCharacterEdge" ADD CONSTRAINT "AnilistCharacterEdge_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistCharacterEdge" ADD CONSTRAINT "AnilistCharacterEdge_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "AnilistCharacter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistStudioEdge" ADD CONSTRAINT "AnilistStudioEdge_anilistId_fkey" FOREIGN KEY ("anilistId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistStudioEdge" ADD CONSTRAINT "AnilistStudioEdge_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "AnilistStudio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
