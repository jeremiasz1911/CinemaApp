-- CreateTable
CREATE TABLE `Filmy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `duration` INTEGER,
    `genre` VARCHAR(191),
    `year` VARCHAR(191),
    `director` VARCHAR(191),
    `description` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seatsNumber` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Klienci` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191),
    `secondName` VARCHAR(191),
    `description` VARCHAR(191),
    `phone` VARCHAR(191),
UNIQUE INDEX `Klienci.phone_unique`(`phone`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Statusy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seanse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filmId` INTEGER NOT NULL,
    `salaId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rezerwacje` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numberSeats` INTEGER,
    `seansId` INTEGER NOT NULL,
    `klientId` INTEGER NOT NULL,
    `statusId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `seats` VARCHAR(191),
    `discount` INTEGER,
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

-- AddForeignKey
ALTER TABLE `Rezerwacje` ADD FOREIGN KEY (`klientId`) REFERENCES `Klienci`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rezerwacje` ADD FOREIGN KEY (`statusId`) REFERENCES `Statusy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
