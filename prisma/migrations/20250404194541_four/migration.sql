/*
  Warnings:

  - The primary key for the `LastUpdated` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "LastUpdated" DROP CONSTRAINT "LastUpdated_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "LastUpdated_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LastUpdated_id_seq";
