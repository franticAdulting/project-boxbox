/*
  Warnings:

  - You are about to drop the column `zone_id` on the `area` table. All the data in the column will be lost.
  - You are about to drop the column `area_id` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `region_id` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `zone_id` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `region_id` on the `zone` table. All the data in the column will be lost.
  - Added the required column `zone_name` to the `area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area_name` to the `location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_name` to the `location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone_name` to the `location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_name` to the `zone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "area" DROP CONSTRAINT "area_zone_id_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_area_id_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_region_id_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_zone_id_fkey";

-- DropForeignKey
ALTER TABLE "zone" DROP CONSTRAINT "zone_region_id_fkey";

-- AlterTable
ALTER TABLE "area" DROP COLUMN "zone_id",
ADD COLUMN     "zone_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "location" DROP COLUMN "area_id",
DROP COLUMN "region_id",
DROP COLUMN "zone_id",
ADD COLUMN     "area_name" TEXT NOT NULL,
ADD COLUMN     "region_name" TEXT NOT NULL,
ADD COLUMN     "zone_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "zone" DROP COLUMN "region_id",
ADD COLUMN     "region_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "zone" ADD CONSTRAINT "zone_region_name_fkey" FOREIGN KEY ("region_name") REFERENCES "region"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_zone_name_fkey" FOREIGN KEY ("zone_name") REFERENCES "zone"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_region_name_fkey" FOREIGN KEY ("region_name") REFERENCES "region"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_zone_name_fkey" FOREIGN KEY ("zone_name") REFERENCES "zone"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_area_name_fkey" FOREIGN KEY ("area_name") REFERENCES "area"("name") ON DELETE CASCADE ON UPDATE CASCADE;
