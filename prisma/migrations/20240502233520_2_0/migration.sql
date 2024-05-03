/*
  Warnings:

  - A unique constraint covering the columns `[tableNumber]` on the table `table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateExp` to the `cupom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cupom" ADD COLUMN     "dateExp" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "table_tableNumber_key" ON "table"("tableNumber");
