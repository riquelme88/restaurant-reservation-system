/*
  Warnings:

  - Changed the type of `price` on the `cupom` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cupom" ADD COLUMN     "dateExp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
