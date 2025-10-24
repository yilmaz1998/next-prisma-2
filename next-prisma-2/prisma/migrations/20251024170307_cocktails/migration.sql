-- CreateTable
CREATE TABLE "Cocktail" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,

    CONSTRAINT "Cocktail_pkey" PRIMARY KEY ("id")
);
