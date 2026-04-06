/*
  Warnings:

  - You are about to drop the column `hero_image` on the `recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "hero_image",
ADD COLUMN     "image_url" TEXT;
