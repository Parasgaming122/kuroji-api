/*
  Warnings:

  - You are about to drop the column `malId` on the `BasicIdShik` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BasicIdShik" DROP COLUMN "malId",
ADD COLUMN     "idMal" INTEGER;
