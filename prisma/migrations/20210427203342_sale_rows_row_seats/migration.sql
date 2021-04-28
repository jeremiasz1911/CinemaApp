/*
  Warnings:

  - Added the required column `rows` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatsRows` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sale` ADD COLUMN     `rows` INTEGER NOT NULL,
    ADD COLUMN     `seatsRows` VARCHAR(191) NOT NULL;
