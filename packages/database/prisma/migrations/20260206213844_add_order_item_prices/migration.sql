/*
  Warnings:

  - You are about to alter the column `price` on the `ingredients` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to drop the column `orderId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `recipe_tags` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `recipe_tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_number]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Made the column `default_unit` on table `ingredients` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `line_total` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `unit` on table `recipe_ingredients` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderId_fkey";

-- AlterTable
ALTER TABLE "ingredients" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "default_unit" SET NOT NULL,
ALTER COLUMN "default_unit" SET DEFAULT 'GRAM';

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "orderId",
ADD COLUMN     "line_total" INTEGER NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "unit_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "total_amount",
ADD COLUMN     "order_number" SERIAL NOT NULL,
ADD COLUMN     "total_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "recipe_ingredients" ALTER COLUMN "unit" SET NOT NULL,
ALTER COLUMN "unit" SET DEFAULT 'GRAM';

-- AlterTable
ALTER TABLE "recipe_tags" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "fibers" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
