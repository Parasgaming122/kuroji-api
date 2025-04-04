-- CreateTable
CREATE TABLE "LastUpdated" (
    "id" SERIAL NOT NULL,
    "entityId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LastUpdated_pkey" PRIMARY KEY ("id")
);
