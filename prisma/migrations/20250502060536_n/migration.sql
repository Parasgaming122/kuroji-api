/*
  Warnings:

  - You are about to drop the column `imageurl` on the `ShikimoriVideo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShikimoriVideo" DROP COLUMN "imageurl",
ADD COLUMN     "imageUrl" TEXT;
