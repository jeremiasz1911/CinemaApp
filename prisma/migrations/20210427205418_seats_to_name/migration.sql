/*
  Warnings:

  - You are about to drop the column `seatsNumber` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `name` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sale` DROP COLUMN `seatsNumber`,
    ADD COLUMN     `name` VARCHAR(191) NOT NULL;
