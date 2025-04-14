/*
  Warnings:

  - You are about to drop the column `favorites` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nameHistoryId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_nameHistoryId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favorites",
DROP COLUMN "nameHistoryId";
