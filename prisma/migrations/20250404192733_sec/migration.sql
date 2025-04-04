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
CREATE TABLE "ReleaseIndex" (
    "id" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReleaseIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ids" (
    "id" SERIAL NOT NULL,
    "sfw" INTEGER[],
    "nsfw" INTEGER[],

    CONSTRAINT "Ids_pkey" PRIMARY KEY ("id")
);
