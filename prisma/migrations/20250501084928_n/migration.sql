-- DropIndex
DROP INDEX "AnilistCharacterEdge_anilistId_characterId_key";

-- AlterTable
ALTER TABLE "AnilistCharacter" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AnilistCharacter_id_seq";

-- AlterTable
ALTER TABLE "AnilistCharacterEdge" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AnilistCharacterEdge_id_seq";

-- AlterTable
ALTER TABLE "AnilistStudio" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AnilistStudio_id_seq";

-- AlterTable
ALTER TABLE "AnilistStudioEdge" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AnilistStudioEdge_id_seq";
