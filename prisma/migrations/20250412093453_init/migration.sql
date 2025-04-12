-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'BANNED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'MODERATOR', 'DEVELOPER', 'TESTER', 'DAYN', 'GAY', 'TRANSGENDER', 'HELICOPTER', 'FIGHTER', 'ZOV', 'PATRIOTIC', 'BANDERA', 'OTAKU', 'AIM9L', 'AIM9M', 'AIM7F', 'R60MK', 'T80U');

-- CreateEnum
CREATE TYPE "UserAccess" AS ENUM ('NOBODY', 'FRIENDS', 'EVERYONE');

-- CreateEnum
CREATE TYPE "AnimeStatus" AS ENUM ('PLANNED', 'ON_HOLD', 'DROPPED', 'WATCHING', 'WATCHED');

-- CreateTable
CREATE TABLE "Anilist" (
    "id" INTEGER NOT NULL,
    "idMal" INTEGER,
    "siteUrl" TEXT,
    "bannerImage" TEXT,
    "status" TEXT,
    "type" TEXT,
    "format" TEXT,
    "updatedAt" INTEGER,
    "description" TEXT,
    "season" TEXT,
    "seasonYear" INTEGER,
    "episodes" INTEGER,
    "duration" INTEGER,
    "countryOfOrigin" TEXT,
    "isLicensed" BOOLEAN,
    "source" TEXT,
    "hashtag" TEXT,
    "trailer" JSONB,
    "isLocked" BOOLEAN,
    "isAdult" BOOLEAN,
    "averageScore" INTEGER,
    "meanScore" INTEGER,
    "popularity" INTEGER,
    "trending" INTEGER,
    "favourites" INTEGER,
    "genres" TEXT[],
    "synonyms" TEXT[],
    "recommendations" JSONB,
    "stats" JSONB,
    "titleId" INTEGER,
    "coverId" INTEGER,
    "startDateId" INTEGER,
    "endDateId" INTEGER,

    CONSTRAINT "Anilist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistTitle" (
    "id" SERIAL NOT NULL,
    "romaji" TEXT,
    "english" TEXT,
    "native" TEXT,

    CONSTRAINT "AnilistTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StartDate" (
    "id" SERIAL NOT NULL,
    "day" INTEGER,
    "month" INTEGER,
    "year" INTEGER,

    CONSTRAINT "StartDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EndDate" (
    "id" SERIAL NOT NULL,
    "day" INTEGER,
    "month" INTEGER,
    "year" INTEGER,

    CONSTRAINT "EndDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistCover" (
    "id" SERIAL NOT NULL,
    "color" TEXT,
    "large" TEXT,
    "medium" TEXT,
    "extraLarge" TEXT,

    CONSTRAINT "AnilistCover_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistIndex" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnilistIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistCharacter" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "characterId" INTEGER,
    "name" TEXT,
    "image" TEXT,

    CONSTRAINT "AnilistCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistTag" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "tagId" INTEGER,
    "name" TEXT,
    "description" TEXT,
    "category" TEXT,
    "rank" INTEGER,
    "isGeneralSpoiler" BOOLEAN,
    "isMediaSpoiler" BOOLEAN,
    "isAdult" BOOLEAN,
    "userId" INTEGER,

    CONSTRAINT "AnilistTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistExternalLink" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "exLinkId" INTEGER,
    "url" TEXT,
    "site" TEXT,
    "siteId" INTEGER,
    "type" TEXT,
    "language" TEXT,
    "color" TEXT,
    "icon" TEXT,
    "notes" TEXT,
    "isDisabled" BOOLEAN,

    CONSTRAINT "AnilistExternalLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistStreamingEpisode" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "title" TEXT,
    "thumbnail" TEXT,
    "url" TEXT,
    "site" TEXT,

    CONSTRAINT "AnilistStreamingEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistStudio" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "studioId" INTEGER,
    "name" TEXT,
    "isMain" BOOLEAN,

    CONSTRAINT "AnilistStudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistAiringSchedule" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "scheduleId" INTEGER,
    "episode" INTEGER,
    "airingAt" INTEGER,

    CONSTRAINT "AnilistAiringSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistNextAiringEpisode" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "episode" INTEGER,
    "airingAt" INTEGER,
    "timeUntilAiring" INTEGER,

    CONSTRAINT "AnilistNextAiringEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicIdAni" (
    "id" SERIAL NOT NULL,
    "idMal" INTEGER,

    CONSTRAINT "BasicIdAni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicRelease" (
    "id" INTEGER NOT NULL,
    "idMal" INTEGER,
    "siteUrl" TEXT,
    "title" JSONB,
    "synonyms" TEXT[],
    "bannerImage" TEXT,
    "coverImage" JSONB,
    "type" TEXT,
    "format" TEXT,
    "status" TEXT,
    "description" TEXT,
    "startDate" JSONB,
    "season" TEXT,
    "seasonYear" INTEGER,
    "episodes" INTEGER,
    "episodesAired" INTEGER,
    "duration" INTEGER,
    "countryOfOrigin" TEXT,
    "popularity" INTEGER,
    "favourites" INTEGER,
    "averageScore" INTEGER,
    "meanScore" INTEGER,
    "isLocked" BOOLEAN,
    "isAdult" BOOLEAN,
    "genres" TEXT[],
    "nextAiringEpisode" JSONB,

    CONSTRAINT "BasicRelease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeKai" (
    "id" TEXT NOT NULL,
    "anilistId" INTEGER,
    "title" TEXT,
    "japaneseTitle" TEXT,
    "image" TEXT,
    "description" TEXT,
    "type" TEXT,
    "url" TEXT,
    "subOrDub" TEXT,
    "hasSub" BOOLEAN,
    "hasDub" BOOLEAN,
    "status" TEXT,
    "season" TEXT,
    "totalEpisodes" INTEGER,
    "episodes" JSONB,

    CONSTRAINT "AnimeKai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimekaiEpisode" (
    "id" TEXT NOT NULL,
    "number" INTEGER,
    "title" TEXT,
    "isFiller" BOOLEAN,
    "isSubbed" BOOLEAN,
    "isDubbed" BOOLEAN,
    "url" TEXT,

    CONSTRAINT "AnimekaiEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animepahe" (
    "id" TEXT NOT NULL,
    "alId" INTEGER,
    "title" TEXT,
    "image" TEXT,
    "cover" TEXT,
    "hasSub" BOOLEAN,
    "externalLinks" JSONB,
    "status" TEXT,
    "type" TEXT,
    "releaseDate" TEXT,
    "totalEpisodes" INTEGER,
    "episodePages" INTEGER,
    "episodes" JSONB,

    CONSTRAINT "Animepahe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimepaheEpisode" (
    "id" TEXT NOT NULL,
    "number" INTEGER,
    "title" TEXT,
    "image" TEXT,
    "duration" TEXT,
    "url" TEXT,

    CONSTRAINT "AnimepaheEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimepaheExternalLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,

    CONSTRAINT "AnimepaheExternalLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shikimori" (
    "id" TEXT NOT NULL,
    "malId" TEXT,
    "name" TEXT,
    "russian" TEXT,
    "licenseNameRu" TEXT,
    "english" TEXT,
    "japanese" TEXT,
    "synonyms" TEXT[],
    "kind" TEXT,
    "rating" TEXT,
    "score" DOUBLE PRECISION,
    "status" TEXT,
    "episodes" INTEGER,
    "episodesAired" INTEGER,
    "duration" INTEGER,
    "airedOn" JSONB,
    "releasedOn" JSONB,
    "url" TEXT,
    "season" TEXT,
    "poster" JSONB,
    "posterId" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "nextEpisodeAt" TIMESTAMP(3),
    "chronology" JSONB,
    "videos" JSONB,
    "screenshots" JSONB,

    CONSTRAINT "Shikimori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiredOn" (
    "id" SERIAL NOT NULL,
    "year" INTEGER,
    "month" INTEGER,
    "day" INTEGER,
    "date" TEXT,

    CONSTRAINT "AiredOn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleasedOn" (
    "id" SERIAL NOT NULL,
    "year" INTEGER,
    "month" INTEGER,
    "day" INTEGER,
    "date" TEXT,

    CONSTRAINT "ReleasedOn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicIdShik" (
    "id" SERIAL NOT NULL,
    "malId" INTEGER,

    CONSTRAINT "BasicIdShik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "videoId" TEXT,
    "videoImageUrl" TEXT,
    "kind" TEXT,
    "videoName" TEXT,
    "playerUrl" TEXT,
    "videoUrl" TEXT,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT,
    "x166Url" TEXT,
    "x332Url" TEXT,

    CONSTRAINT "Screenshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicReleaseShikimori" (
    "id" SERIAL NOT NULL,
    "idMal" INTEGER,
    "siteUrl" TEXT,
    "title" JSONB,
    "titleId" INTEGER,
    "synonyms" TEXT[],
    "bannerImage" TEXT,
    "coverImage" JSONB,
    "coverImageId" INTEGER,
    "type" TEXT,
    "format" TEXT,
    "status" TEXT,
    "description" TEXT,
    "startDate" JSONB,
    "startDateId" INTEGER,
    "season" TEXT,
    "seasonYear" INTEGER,
    "episodes" INTEGER,
    "episodesAired" INTEGER,
    "duration" INTEGER,
    "countryOfOrigin" TEXT,
    "popularity" INTEGER,
    "favourites" INTEGER,
    "averageScore" INTEGER,
    "meanScore" INTEGER,
    "isLocked" BOOLEAN,
    "isAdult" BOOLEAN,
    "genres" TEXT[],
    "nextAiringEpisode" JSONB,
    "nextAiringEpisodeId" INTEGER,
    "shikimori" JSONB,
    "shikimoriId" INTEGER,

    CONSTRAINT "BasicReleaseShikimori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Title" (
    "id" SERIAL NOT NULL,
    "romaji" TEXT,
    "english" TEXT,
    "native" TEXT,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverImage" (
    "id" SERIAL NOT NULL,
    "extraLarge" TEXT,
    "large" TEXT,
    "medium" TEXT,
    "color" TEXT,

    CONSTRAINT "CoverImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateDetails" (
    "id" SERIAL NOT NULL,
    "year" INTEGER,
    "month" INTEGER,
    "day" INTEGER,

    CONSTRAINT "DateDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiringEpisode" (
    "id" SERIAL NOT NULL,
    "airingAt" INTEGER,
    "timeUntilAiring" INTEGER,
    "episode" INTEGER,

    CONSTRAINT "AiringEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicShikimori" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "url" TEXT,
    "poster" JSONB,
    "posterId" INTEGER,

    CONSTRAINT "BasicShikimori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poster" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT,
    "mainUrl" TEXT,

    CONSTRAINT "Poster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseIndex" (
    "id" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReleaseIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastUpdated" (
    "id" SERIAL NOT NULL,
    "entityId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LastUpdated_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tmdb" (
    "id" INTEGER NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "backdrop_path" TEXT,
    "episode_run_time" INTEGER[],
    "media_type" TEXT,
    "first_air_date" TEXT,
    "homepage" TEXT,
    "in_production" BOOLEAN,
    "last_air_date" TEXT,
    "name" TEXT,
    "number_of_episodes" INTEGER,
    "number_of_seasons" INTEGER,
    "original_language" TEXT,
    "original_name" TEXT,
    "origin_country" TEXT[],
    "overview" TEXT,
    "popularity" DOUBLE PRECISION,
    "poster_path" TEXT,
    "tagline" TEXT,
    "status" TEXT,
    "type" TEXT,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,
    "seasons" JSONB,

    CONSTRAINT "Tmdb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TmdbReleaseSeason" (
    "id" INTEGER NOT NULL,
    "air_date" TEXT,
    "episode_count" INTEGER,
    "name" TEXT,
    "overview" TEXT,
    "poster_path" TEXT,
    "season_number" INTEGER,
    "vote_average" DOUBLE PRECISION,

    CONSTRAINT "TmdbReleaseSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TmdbSeason" (
    "id" INTEGER NOT NULL,
    "air_date" TEXT,
    "show_id" INTEGER,
    "name" TEXT,
    "overview" TEXT,
    "poster_path" TEXT,
    "season_number" INTEGER,
    "vote_average" DOUBLE PRECISION,
    "episodes" JSONB,

    CONSTRAINT "TmdbSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TmdbSeasonEpisode" (
    "id" INTEGER NOT NULL,
    "air_date" TEXT,
    "episode_number" INTEGER,
    "episode_type" TEXT,
    "name" TEXT,
    "overview" TEXT,
    "production_code" TEXT,
    "runtime" INTEGER,
    "season_number" INTEGER,
    "show_id" INTEGER,
    "still_path" TEXT,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,

    CONSTRAINT "TmdbSeasonEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tvdb" (
    "id" INTEGER NOT NULL,
    "tmdbId" INTEGER,
    "type" TEXT,
    "name" TEXT,
    "slug" TEXT,
    "image" TEXT,
    "score" INTEGER,
    "runtime" INTEGER,
    "lastUpdated" TEXT,
    "year" TEXT,
    "nameTranslations" TEXT[],
    "overviewTranslations" TEXT[],
    "aliases" JSONB,
    "artworks" JSONB,
    "remoteIds" JSONB,

    CONSTRAINT "Tvdb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tvdb_aliases" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "language" TEXT,

    CONSTRAINT "tvdb_aliases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tvdb_artworks" (
    "id" INTEGER NOT NULL,
    "height" INTEGER,
    "image" TEXT,
    "includesText" BOOLEAN,
    "language" TEXT,
    "score" INTEGER,
    "thumbnail" TEXT,
    "type" INTEGER,
    "width" INTEGER,

    CONSTRAINT "tvdb_artworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tvdb_remote" (
    "id" TEXT NOT NULL,
    "type" INTEGER,
    "sourceName" TEXT,

    CONSTRAINT "tvdb_remote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvdbLogin" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TvdbLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "reputation" DOUBLE PRECISION NOT NULL DEFAULT 100.0,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailToken" TEXT,
    "emailTokenExpiry" TIMESTAMP(3),
    "favorites" TEXT[],
    "roles" "UserRole"[],
    "avatarId" BIGINT,
    "userStatsId" BIGINT NOT NULL,
    "nameHistoryId" INTEGER NOT NULL,
    "socialsId" BIGINT NOT NULL,
    "userPrivacyId" BIGINT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPrivacy" (
    "id" BIGSERIAL NOT NULL,
    "statAccess" "UserAccess" NOT NULL,
    "releasesAccess" "UserAccess" NOT NULL,
    "socialsAccess" "UserAccess" NOT NULL,
    "friendRequestPolicy" "UserAccess" NOT NULL,

    CONSTRAINT "UserPrivacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Socials" (
    "id" BIGSERIAL NOT NULL,
    "github" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "tiktok" TEXT NOT NULL,

    CONSTRAINT "Socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NameHistory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "first" BOOLEAN NOT NULL,

    CONSTRAINT "NameHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStats" (
    "id" BIGSERIAL NOT NULL,
    "commentsAmount" INTEGER NOT NULL,
    "collections" INTEGER NOT NULL,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnime" (
    "id" BIGSERIAL NOT NULL,
    "animeId" TEXT NOT NULL,
    "status" "AnimeStatus" NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userStatsId" BIGINT,

    CONSTRAINT "UserAnime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" BIGSERIAL NOT NULL,
    "filename" TEXT,
    "originalName" TEXT,
    "mimeType" TEXT,
    "size" INTEGER,
    "path" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zoro" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "malID" INTEGER,
    "alID" INTEGER,
    "japaneseTitle" TEXT,
    "image" TEXT,
    "description" TEXT,
    "type" TEXT,
    "url" TEXT,
    "subOrDub" TEXT,
    "hasSub" BOOLEAN,
    "hasDub" BOOLEAN,
    "status" TEXT,
    "season" TEXT,
    "totalEpisodes" INTEGER,
    "episodes" JSONB,

    CONSTRAINT "Zoro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EpisodeZoro" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "isFiller" BOOLEAN NOT NULL,
    "isSubbed" BOOLEAN NOT NULL,
    "isDubbed" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "EpisodeZoro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnilistNextAiringEpisode_releaseId_key" ON "AnilistNextAiringEpisode"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "AnilistTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "AnilistCover"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_startDateId_fkey" FOREIGN KEY ("startDateId") REFERENCES "StartDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anilist" ADD CONSTRAINT "Anilist_endDateId_fkey" FOREIGN KEY ("endDateId") REFERENCES "EndDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistCharacter" ADD CONSTRAINT "AnilistCharacter_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistTag" ADD CONSTRAINT "AnilistTag_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistExternalLink" ADD CONSTRAINT "AnilistExternalLink_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistStreamingEpisode" ADD CONSTRAINT "AnilistStreamingEpisode_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistStudio" ADD CONSTRAINT "AnilistStudio_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistAiringSchedule" ADD CONSTRAINT "AnilistAiringSchedule_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnilistNextAiringEpisode" ADD CONSTRAINT "AnilistNextAiringEpisode_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_nameHistoryId_fkey" FOREIGN KEY ("nameHistoryId") REFERENCES "NameHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_socialsId_fkey" FOREIGN KEY ("socialsId") REFERENCES "Socials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPrivacyId_fkey" FOREIGN KEY ("userPrivacyId") REFERENCES "UserPrivacy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnime" ADD CONSTRAINT "UserAnime_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("id") ON DELETE SET NULL ON UPDATE CASCADE;
