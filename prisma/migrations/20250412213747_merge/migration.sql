/*
  Warnings:

  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `BasicRelease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BasicReleaseShikimori` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Anilist" ADD COLUMN     "moreInfo" TEXT,
ADD COLUMN     "score" INTEGER;

-- AlterTable
ALTER TABLE "Shikimori" ADD COLUMN     "franchise" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT;

-- DropTable
DROP TABLE "BasicRelease";

-- DropTable
DROP TABLE "BasicReleaseShikimori";

-- DropEnum
DROP TYPE "AccountStatus";
