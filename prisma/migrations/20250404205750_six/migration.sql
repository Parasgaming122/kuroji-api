/*
  Warnings:

  - You are about to drop the column `airedDate` on the `AiredOn` table. All the data in the column will be lost.
  - You are about to drop the column `airedDay` on the `AiredOn` table. All the data in the column will be lost.
  - You are about to drop the column `airedMonth` on the `AiredOn` table. All the data in the column will be lost.
  - You are about to drop the column `airedYear` on the `AiredOn` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `ReleasedOn` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDay` on the `ReleasedOn` table. All the data in the column will be lost.
  - You are about to drop the column `releaseMonth` on the `ReleasedOn` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `ReleasedOn` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Shikimori` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AiredOn" DROP COLUMN "airedDate",
DROP COLUMN "airedDay",
DROP COLUMN "airedMonth",
DROP COLUMN "airedYear",
ADD COLUMN     "date" TEXT,
ADD COLUMN     "day" INTEGER,
ADD COLUMN     "month" INTEGER,
ADD COLUMN     "year" INTEGER;

-- AlterTable
ALTER TABLE "ReleasedOn" DROP COLUMN "releaseDate",
DROP COLUMN "releaseDay",
DROP COLUMN "releaseMonth",
DROP COLUMN "releaseYear",
ADD COLUMN     "date" TEXT,
ADD COLUMN     "day" INTEGER,
ADD COLUMN     "month" INTEGER,
ADD COLUMN     "year" INTEGER;

-- AlterTable
ALTER TABLE "Shikimori" DROP COLUMN "year";
