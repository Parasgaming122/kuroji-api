/*
  Warnings:

  - You are about to drop the column `fullName` on the `AnilistCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `imageLarge` on the `AnilistCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `imageMedium` on the `AnilistCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `nativeName` on the `AnilistCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `VoiceActor` table. All the data in the column will be lost.
  - You are about to drop the column `imageLarge` on the `VoiceActor` table. All the data in the column will be lost.
  - You are about to drop the column `imageMedium` on the `VoiceActor` table. All the data in the column will be lost.
  - You are about to drop the column `nativeName` on the `VoiceActor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnilistCharacter" DROP COLUMN "fullName",
DROP COLUMN "imageLarge",
DROP COLUMN "imageMedium",
DROP COLUMN "nativeName";

-- AlterTable
ALTER TABLE "VoiceActor" DROP COLUMN "fullName",
DROP COLUMN "imageLarge",
DROP COLUMN "imageMedium",
DROP COLUMN "nativeName";

-- CreateTable
CREATE TABLE "AnilistCharacterName" (
    "id" SERIAL NOT NULL,
    "full" TEXT,
    "native" TEXT,
    "alternative" TEXT,
    "characterId" INTEGER,

    CONSTRAINT "AnilistCharacterName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistCharacterImage" (
    "id" SERIAL NOT NULL,
    "large" TEXT,
    "medium" TEXT,
    "characterId" INTEGER,

    CONSTRAINT "AnilistCharacterImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistVoiceName" (
    "id" SERIAL NOT NULL,
    "full" TEXT,
    "native" TEXT,
    "alternative" TEXT,
    "voiceActorId" INTEGER,

    CONSTRAINT "AnilistVoiceName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistVoiceImage" (
    "id" SERIAL NOT NULL,
    "large" TEXT,
    "medium" TEXT,
    "voiceActorId" INTEGER,

    CONSTRAINT "AnilistVoiceImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnilistCharacterName_characterId_key" ON "AnilistCharacterName"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistCharacterImage_characterId_key" ON "AnilistCharacterImage"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistVoiceName_voiceActorId_key" ON "AnilistVoiceName"("voiceActorId");

-- CreateIndex
CREATE UNIQUE INDEX "AnilistVoiceImage_voiceActorId_key" ON "AnilistVoiceImage"("voiceActorId");

-- AddForeignKey
ALTER TABLE "AnilistCharacterName" ADD CONSTRAINT "AnilistCharacterName_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "AnilistCharacter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistCharacterImage" ADD CONSTRAINT "AnilistCharacterImage_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "AnilistCharacter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistVoiceName" ADD CONSTRAINT "AnilistVoiceName_voiceActorId_fkey" FOREIGN KEY ("voiceActorId") REFERENCES "VoiceActor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistVoiceImage" ADD CONSTRAINT "AnilistVoiceImage_voiceActorId_fkey" FOREIGN KEY ("voiceActorId") REFERENCES "VoiceActor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
