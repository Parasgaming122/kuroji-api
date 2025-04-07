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

    CONSTRAINT "AnimeKai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "number" INTEGER,
    "title" TEXT,
    "isFiller" BOOLEAN,
    "isSubbed" BOOLEAN,
    "isDubbed" BOOLEAN,
    "url" TEXT,
    "animeKaiId" TEXT NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_animeKaiId_fkey" FOREIGN KEY ("animeKaiId") REFERENCES "AnimeKai"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
