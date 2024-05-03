/*
  Warnings:

  - You are about to drop the column `dateExp` on the `cupom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cupom" DROP COLUMN "dateExp",
ALTER COLUMN "price" SET DATA TYPE TEXT;
