-- CreateTable
CREATE TABLE `Filmy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `duration` INTEGER NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `director` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1500) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `rows` INTEGER NOT NULL,
    `seatsRows` VARCHAR(8000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seanse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filmId` INTEGER NOT NULL,
    `salaId` INTEGER NOT NULL,
    `dataSeansu` DATETIME(3) NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rezerwacje` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numberSeats` VARCHAR(191),
    `seansId` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `discount` INTEGER,
    `guid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191),
    `password` VARCHAR(191),
    `token` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Seanse` ADD FOREIGN KEY (`filmId`) REFERENCES `Filmy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seanse` ADD FOREIGN KEY (`salaId`) REFERENCES `Sale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rezerwacje` ADD FOREIGN KEY (`seansId`) REFERENCES `Seanse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
