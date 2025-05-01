-- AlterTable
ALTER TABLE "AnilistAiringSchedule" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AnilistAiringSchedule_id_seq";

-- AlterTable
ALTER TABLE "AnilistExternalLink" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AnilistExternalLink_id_seq";

-- AlterTable
ALTER TABLE "AnilistNextAiringEpisode" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AnilistNextAiringEpisode_id_seq";

-- AlterTable
ALTER TABLE "AnilistRanking" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AnilistRanking_id_seq";

-- AlterTable
ALTER TABLE "AnilistTag" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AnilistTag_id_seq";

-- AlterTable
ALTER TABLE "VoiceActor" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "VoiceActor_id_seq";
