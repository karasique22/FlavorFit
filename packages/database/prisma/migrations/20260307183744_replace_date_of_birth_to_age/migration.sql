/*
  Warnings:

  - You are about to drop the column `date_of_birth` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "date_of_birth",
ADD COLUMN     "age" INTEGER;
