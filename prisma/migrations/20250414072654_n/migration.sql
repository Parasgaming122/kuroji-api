-- AlterTable
ALTER TABLE "LastUpdated" ADD COLUMN     "externalId" INTEGER;

-- AlterTable
ALTER TABLE "Tvdb" ADD COLUMN     "status" JSONB;

-- CreateTable
CREATE TABLE "Exception" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusCode" INTEGER,
    "timestamp" TEXT,
    "path" TEXT,
    "method" TEXT,
    "message" TEXT,
    "file" TEXT,
    "line" TEXT,
    "stack" TEXT,

    CONSTRAINT "Exception_pkey" PRIMARY KEY ("id")
);
