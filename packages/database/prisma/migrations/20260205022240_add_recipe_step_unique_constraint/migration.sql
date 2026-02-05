/*
  Warnings:

  - A unique constraint covering the columns `[recipe_id,order]` on the table `recipe_steps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipe_steps_recipe_id_order_key" ON "recipe_steps"("recipe_id", "order");
