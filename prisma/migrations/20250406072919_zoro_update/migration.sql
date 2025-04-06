/*
  Warnings:

  - You are about to drop the column `isFilter` on the `EpisodeZoro` table. All the data in the column will be lost.
  - Added the required column `isFiller` to the `EpisodeZoro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EpisodeZoro" DROP COLUMN "isFilter",
ADD COLUMN     "isFiller" BOOLEAN NOT NULL;
