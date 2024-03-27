/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Faculty` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Faculty_departmentId_key";

-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "departmentId";
