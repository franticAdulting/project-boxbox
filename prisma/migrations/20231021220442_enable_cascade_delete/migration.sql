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

-- AddForeignKey
ALTER TABLE "zone" ADD CONSTRAINT "zone_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE;
