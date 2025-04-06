/*
  Warnings:

  - You are about to drop the column `addedAt` on the `AnilistIndex` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnilistIndex" DROP COLUMN "addedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
