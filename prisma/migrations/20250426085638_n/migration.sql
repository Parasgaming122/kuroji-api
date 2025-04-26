/*
  Warnings:

  - You are about to drop the column `image` on the `AnilistCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `AnilistCharacter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnilistCharacter" DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "imageLarge" TEXT,
ADD COLUMN     "imageMedium" TEXT,
ADD COLUMN     "nativeName" TEXT,
ADD COLUMN     "role" TEXT;

-- CreateTable
CREATE TABLE "VoiceActor" (
    "id" SERIAL NOT NULL,
    "anilistId" INTEGER NOT NULL,
    "fullName" TEXT,
    "nativeName" TEXT,
    "imageLarge" TEXT,
    "imageMedium" TEXT,
    "language" TEXT,

    CONSTRAINT "VoiceActor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterVoiceActors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CharacterVoiceActors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "VoiceActor_anilistId_key" ON "VoiceActor"("anilistId");

-- CreateIndex
CREATE INDEX "_CharacterVoiceActors_B_index" ON "_CharacterVoiceActors"("B");

-- AddForeignKey
ALTER TABLE "_CharacterVoiceActors" ADD CONSTRAINT "_CharacterVoiceActors_A_fkey" FOREIGN KEY ("A") REFERENCES "AnilistCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterVoiceActors" ADD CONSTRAINT "_CharacterVoiceActors_B_fkey" FOREIGN KEY ("B") REFERENCES "VoiceActor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
