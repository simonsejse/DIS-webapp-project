/*
  Warnings:

  - Made the column `description` on table `Spreadsheet` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "SpreadsheetStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Spreadsheet" ADD COLUMN     "status" "SpreadsheetStatus" NOT NULL DEFAULT 'OPEN',
ALTER COLUMN "description" SET NOT NULL;
