/*
  Warnings:

  - You are about to drop the column `end_date` on the `Spreadsheet` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Spreadsheet` table. All the data in the column will be lost.
  - Added the required column `name` to the `Spreadsheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spreadsheet" DROP COLUMN "end_date",
DROP COLUMN "start_date",
ADD COLUMN     "name" TEXT NOT NULL;
