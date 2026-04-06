-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "dish_type_id" TEXT;

-- CreateTable
CREATE TABLE "dish_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dish_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dish_types_name_key" ON "dish_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dish_types_slug_key" ON "dish_types"("slug");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_dish_type_id_fkey" FOREIGN KEY ("dish_type_id") REFERENCES "dish_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
