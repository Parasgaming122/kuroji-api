/*
  Warnings:

  - You are about to drop the column `idMal` on the `BasicIdShik` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BasicIdShik" DROP COLUMN "idMal",
ADD COLUMN     "malId" INTEGER;
