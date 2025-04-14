-- CreateTable
CREATE TABLE "TvdbLanguageTranslation" (
    "id" SERIAL NOT NULL,
    "tvdbId" INTEGER NOT NULL,
    "name" TEXT,
    "overview" TEXT,
    "isAlias" BOOLEAN,
    "isPrimary" BOOLEAN,
    "language" TEXT,
    "tagline" TEXT,
    "aliases" TEXT[],

    CONSTRAINT "TvdbLanguageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvdbLanguage" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "nativeName" TEXT,
    "shortCode" TEXT,

    CONSTRAINT "TvdbLanguage_pkey" PRIMARY KEY ("id")
);
