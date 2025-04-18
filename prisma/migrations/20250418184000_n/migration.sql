/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AnilistTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AnilistTag_name_key" ON "AnilistTag"("name");
