/*
  Warnings:

  - You are about to drop the column `videoId` on the `ShikimoriVideo` table. All the data in the column will be lost.
  - You are about to drop the column `videoImageUrl` on the `ShikimoriVideo` table. All the data in the column will be lost.
  - You are about to drop the column `videoName` on the `ShikimoriVideo` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `ShikimoriVideo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShikimoriVideo" DROP COLUMN "videoId",
DROP COLUMN "videoImageUrl",
DROP COLUMN "videoName",
DROP COLUMN "videoUrl",
ADD COLUMN     "imageurl" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "url" TEXT;
