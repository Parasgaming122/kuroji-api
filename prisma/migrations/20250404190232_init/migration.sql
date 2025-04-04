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
    "airedOnId" INTEGER,
    "releasedOnId" INTEGER,
    "url" TEXT,
    "season" TEXT,
    "posterId" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "nextEpisodeAt" TIMESTAMP(3),

    CONSTRAINT "Shikimori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiredOn" (
    "id" SERIAL NOT NULL,
    "airedYear" INTEGER,
    "airedMonth" INTEGER,
    "airedDay" INTEGER,
    "airedDate" TEXT,

    CONSTRAINT "AiredOn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleasedOn" (
    "id" SERIAL NOT NULL,
    "releaseYear" INTEGER,
    "releaseMonth" INTEGER,
    "releaseDay" INTEGER,
    "releaseDate" TEXT,

    CONSTRAINT "ReleasedOn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicId" (
    "id" SERIAL NOT NULL,
    "idMal" INTEGER,
    "shikimoriId" TEXT,

    CONSTRAINT "BasicId_pkey" PRIMARY KEY ("id")
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
    "shikimoriId" TEXT,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT,
    "x166Url" TEXT,
    "x332Url" TEXT,
    "shikimoriId" TEXT,

    CONSTRAINT "Screenshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicRelease" (
    "id" SERIAL NOT NULL,
    "idMal" INTEGER,
    "siteUrl" TEXT,
    "titleId" INTEGER,
    "synonyms" TEXT[],
    "bannerImage" TEXT,
    "coverImageId" INTEGER,
    "type" TEXT,
    "format" TEXT,
    "status" TEXT,
    "description" TEXT,
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
    "nextAiringEpisodeId" INTEGER,
    "shikimoriId" INTEGER,

    CONSTRAINT "BasicRelease_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "Shikimori" ADD CONSTRAINT "Shikimori_airedOnId_fkey" FOREIGN KEY ("airedOnId") REFERENCES "AiredOn"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shikimori" ADD CONSTRAINT "Shikimori_releasedOnId_fkey" FOREIGN KEY ("releasedOnId") REFERENCES "ReleasedOn"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shikimori" ADD CONSTRAINT "Shikimori_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Poster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicId" ADD CONSTRAINT "BasicId_shikimoriId_fkey" FOREIGN KEY ("shikimoriId") REFERENCES "Shikimori"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_shikimoriId_fkey" FOREIGN KEY ("shikimoriId") REFERENCES "Shikimori"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screenshot" ADD CONSTRAINT "Screenshot_shikimoriId_fkey" FOREIGN KEY ("shikimoriId") REFERENCES "Shikimori"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicRelease" ADD CONSTRAINT "BasicRelease_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicRelease" ADD CONSTRAINT "BasicRelease_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "CoverImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicRelease" ADD CONSTRAINT "BasicRelease_startDateId_fkey" FOREIGN KEY ("startDateId") REFERENCES "DateDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicRelease" ADD CONSTRAINT "BasicRelease_nextAiringEpisodeId_fkey" FOREIGN KEY ("nextAiringEpisodeId") REFERENCES "AiringEpisode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicRelease" ADD CONSTRAINT "BasicRelease_shikimoriId_fkey" FOREIGN KEY ("shikimoriId") REFERENCES "BasicShikimori"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasicShikimori" ADD CONSTRAINT "BasicShikimori_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Poster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
