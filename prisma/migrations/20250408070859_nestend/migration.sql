-- CreateTable
CREATE TABLE "TvdbLogin" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TvdbLogin_pkey" PRIMARY KEY ("id")
);
