/*
  Warnings:

  - The values [MOD] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'USER', 'MODERATOR', 'DEVELOPER', 'TESTER', 'DAYN', 'GAY', 'TRANSGENDER', 'HELICOPTER', 'FIGHTER', 'ZOV', 'PATRIOTIC', 'BANDERA', 'OTAKU', 'AIM9L', 'AIM9M', 'AIM7F', 'R60MK', 'T80U');
ALTER TABLE "User" ALTER COLUMN "roles" TYPE "UserRole_new"[] USING ("roles"::text::"UserRole_new"[]);
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;
