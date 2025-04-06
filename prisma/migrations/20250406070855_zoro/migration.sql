-- CreateTable
CREATE TABLE "Zoro" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "malID" INTEGER NOT NULL,
    "alID" INTEGER NOT NULL,
    "japaneseTitle" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "subOrDub" TEXT NOT NULL,
    "hasSub" BOOLEAN NOT NULL,
    "hasDub" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "totalEpisodes" INTEGER NOT NULL,

    CONSTRAINT "Zoro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EpisodeZoro" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "isFilter" BOOLEAN NOT NULL,
    "isSubbed" BOOLEAN NOT NULL,
    "isDubbed" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "zoroId" TEXT,

    CONSTRAINT "EpisodeZoro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EpisodeZoro" ADD CONSTRAINT "EpisodeZoro_zoroId_fkey" FOREIGN KEY ("zoroId") REFERENCES "Zoro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
