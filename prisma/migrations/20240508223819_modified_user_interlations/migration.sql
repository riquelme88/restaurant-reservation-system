/*
  Warnings:

  - You are about to drop the column `idCupom` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `idHour` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `idTable` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_idCupom_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_idHour_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_idTable_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "idCupom",
DROP COLUMN "idHour",
DROP COLUMN "idTable",
ADD COLUMN     "cupomId" INTEGER,
ADD COLUMN     "hoursId" INTEGER,
ADD COLUMN     "tableId" INTEGER;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_hoursId_fkey" FOREIGN KEY ("hoursId") REFERENCES "hours"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_cupomId_fkey" FOREIGN KEY ("cupomId") REFERENCES "cupom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
