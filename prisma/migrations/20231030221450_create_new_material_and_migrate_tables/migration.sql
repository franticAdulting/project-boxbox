-- CreateTable
CREATE TABLE "material" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "item_level" INTEGER NOT NULL,
    "crafter_class" TEXT NOT NULL,
    "yields" INTEGER NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_materialTorecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_materialTorecipe_AB_unique" ON "_materialTorecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_materialTorecipe_B_index" ON "_materialTorecipe"("B");

-- AddForeignKey
ALTER TABLE "_materialTorecipe" ADD CONSTRAINT "_materialTorecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_materialTorecipe" ADD CONSTRAINT "_materialTorecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
