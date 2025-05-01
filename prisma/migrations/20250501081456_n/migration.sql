/*
  Warnings:

  - A unique constraint covering the columns `[anilistId,characterId]` on the table `AnilistCharacterEdge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[anilistId,studioId]` on the table `AnilistStudioEdge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AnilistCharacterEdge_anilistId_characterId_key" ON "AnilistCharacterEdge"("anilistId", "characterId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistStudioEdge_anilistId_studioId_key" ON "AnilistStudioEdge"("anilistId", "studioId");
