/*
  Warnings:

  - Added the required column `zone_id` to the `area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `zone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "area" ADD COLUMN     "zone_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "zone" ADD COLUMN     "region_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "zone" ADD CONSTRAINT "zone_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
