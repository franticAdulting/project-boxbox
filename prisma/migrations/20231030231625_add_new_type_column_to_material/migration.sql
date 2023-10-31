/*
  Warnings:

  - Added the required column `type` to the `material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "material" ADD COLUMN     "type" TEXT NOT NULL;
