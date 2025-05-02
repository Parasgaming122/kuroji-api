/*
  Warnings:

  - The primary key for the `BasicIdShik` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ShikimoriChronology` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_ShikimoriChronology" DROP CONSTRAINT "_ShikimoriChronology_A_fkey";

-- AlterTable
ALTER TABLE "BasicIdShik" DROP CONSTRAINT "BasicIdShik_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "malId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BasicIdShik_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_ShikimoriChronology" DROP CONSTRAINT "_ShikimoriChronology_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_ShikimoriChronology_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "_ShikimoriChronology" ADD CONSTRAINT "_ShikimoriChronology_A_fkey" FOREIGN KEY ("A") REFERENCES "BasicIdShik"("id") ON DELETE CASCADE ON UPDATE CASCADE;
