-- CreateTable
CREATE TABLE "AnilistRanking" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "rank" INTEGER,
    "type" TEXT,
    "format" TEXT,
    "year" INTEGER,
    "season" TEXT,
    "allTime" BOOLEAN,
    "context" TEXT NOT NULL,

    CONSTRAINT "AnilistRanking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnilistRanking_releaseId_key" ON "AnilistRanking"("releaseId");

-- AddForeignKey
ALTER TABLE "AnilistRanking" ADD CONSTRAINT "AnilistRanking_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Anilist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
