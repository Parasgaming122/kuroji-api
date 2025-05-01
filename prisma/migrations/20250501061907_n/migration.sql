/*
  Warnings:

  - You are about to drop the column `siteUrl` on the `AnilistCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `siteUrl` on the `AnilistStudio` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AnilistTag` table. All the data in the column will be lost.
  - You are about to drop the column `siteUrl` on the `VoiceActor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnilistCharacter" DROP COLUMN "siteUrl";

-- AlterTable
ALTER TABLE "AnilistStudio" DROP COLUMN "siteUrl";

-- AlterTable
ALTER TABLE "AnilistTag" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "VoiceActor" DROP COLUMN "siteUrl";
