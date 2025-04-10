/*
  Warnings:

  - You are about to drop the column `titleId` on the `Anilist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anilist" DROP CONSTRAINT "Anilist_titleId_fkey";

-- AlterTable
ALTER TABLE "Anilist" DROP COLUMN "titleId",
ADD COLUMN     "title" JSONB;
