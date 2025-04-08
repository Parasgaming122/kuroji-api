-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'BANNED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'MOD', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserAccess" AS ENUM ('NOBODY', 'FRIENDS', 'EVERYONE');

-- CreateEnum
CREATE TYPE "AnimeStatus" AS ENUM ('PLANNED', 'ON_HOLD', 'DROPPED', 'WATCHING', 'WATCHED');

-- CreateTable
CREATE TABLE "Anilist" (
    "id" INTEGER NOT NULL,
    "idMal" INTEGER,
    "siteUrl" TEXT,
    "title" JSONB,
    "coverImage" JSONB,
    "bannerImage" TEXT,
    "status" TEXT,
    "type" TEXT,
    "format" TEXT,
    "updatedAt" INTEGER,
    "description" TEXT,
    "startDate" JSONB,
    "endDate" JSONB,
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
    "characters" JSONB,
    "studios" JSONB,
    "airingSchedule" JSONB,
    "nextAiringEpisode" JSONB,
    "stats" JSONB,
    "tags" JSONB,
    "externalLinks" JSONB,
    "streamingEpisodes" JSONB,
    "BasicIdAni" JSONB,

    CONSTRAINT "Anilist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnilistIndex" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnilistIndex_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "ReleaseFilter" (
    "id" SERIAL NOT NULL,
    "sort" TEXT[],
    "perPage" INTEGER,
    "page" INTEGER,
    "sourceIn" TEXT[],
    "popularityLesser" INTEGER,
    "popularityGreater" INTEGER,
    "popularityNot" INTEGER,
    "averageScoreLesser" INTEGER,
    "averageScoreGreater" INTEGER,
    "averageScoreNot" INTEGER,
    "licensedByIdIn" TEXT[],
    "licensedByIn" TEXT[],
    "tagCategoryNotIn" TEXT[],
    "tagCategoryIn" TEXT[],
    "tagNotIn" TEXT[],
    "tagIn" TEXT[],
    "genreNotIn" TEXT[],
    "genreIn" TEXT[],
    "durationLesser" INTEGER,
    "durationGreater" INTEGER,
    "episodesLesser" INTEGER,
    "episodesGreater" INTEGER,
    "statusNotIn" TEXT[],
    "statusNot" TEXT,
    "statusIn" TEXT[],
    "formatNotIn" TEXT[],
    "formatNot" TEXT,
    "formatIn" TEXT[],
    "endDateLike" TEXT,
    "endDateLesser" TEXT,
    "endDateGreater" TEXT,
    "startDateLike" TEXT,
    "startDateLesser" TEXT,
    "startDateGreater" TEXT,
    "idMalNotIn" INTEGER[],
    "idMalIn" INTEGER[],
    "idMalNot" INTEGER,
    "idNotIn" INTEGER[],
    "idIn" INTEGER[],
    "idNot" INTEGER,
    "search" TEXT,
    "isLicensed" BOOLEAN,
    "countryOfOrigin" TEXT,
    "isAdult" BOOLEAN,
    "format" TEXT,
    "type" TEXT,
    "status" TEXT,
    "season" TEXT,
    "idMal" INTEGER,

    CONSTRAINT "ReleaseFilter_pkey" PRIMARY KEY ("id")
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
    "airedOnId" INTEGER,
    "releasedOn" JSONB,
    "releasedOnId" INTEGER,
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
    "password" TEXT NOT NULL,
    "status" "AccountStatus" NOT NULL,
    "reputation" DOUBLE PRECISION NOT NULL,
    "isOnline" BOOLEAN NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "favorites" TEXT[],
    "roles" "UserRole"[],
    "avatarId" BIGINT NOT NULL,
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
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
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
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_nameHistoryId_fkey" FOREIGN KEY ("nameHistoryId") REFERENCES "NameHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_socialsId_fkey" FOREIGN KEY ("socialsId") REFERENCES "Socials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPrivacyId_fkey" FOREIGN KEY ("userPrivacyId") REFERENCES "UserPrivacy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnime" ADD CONSTRAINT "UserAnime_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("id") ON DELETE SET NULL ON UPDATE CASCADE;
