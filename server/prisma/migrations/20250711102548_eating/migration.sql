-- CreateTable
CREATE TABLE `Eating` (
    `day` INTEGER NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `price_desc` VARCHAR(191) NOT NULL,
    `eating_exp` INTEGER NOT NULL,
    `eating_status` VARCHAR(191) NOT NULL DEFAULT 'Unfinished',

    PRIMARY KEY (`day`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
