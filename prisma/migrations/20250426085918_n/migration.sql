/*
  Warnings:

  - You are about to drop the column `anilistId` on the `VoiceActor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "VoiceActor_anilistId_key";

-- AlterTable
ALTER TABLE "VoiceActor" DROP COLUMN "anilistId";
