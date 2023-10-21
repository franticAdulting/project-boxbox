/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `area` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `region` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `zone` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "area_name_key" ON "area"("name");

-- CreateIndex
CREATE UNIQUE INDEX "region_name_key" ON "region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "zone_name_key" ON "zone"("name");
