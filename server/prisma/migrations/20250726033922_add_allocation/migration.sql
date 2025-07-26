/*
  Warnings:

  - The primary key for the `eating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `price_desc` on the `eating` table. All the data in the column will be lost.
  - Added the required column `gizi` to the `eating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `eating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eating` DROP PRIMARY KEY,
    DROP COLUMN `price_desc`,
    ADD COLUMN `gizi` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `day` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `day`);

-- CreateTable
CREATE TABLE `allocation` (
    `allocation_day` INTEGER NOT NULL,
    `items` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `allocation_exp` INTEGER NOT NULL,
    `allocation_status` VARCHAR(191) NOT NULL DEFAULT 'Unfinished',
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `allocation_day`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `eating` ADD CONSTRAINT `eating_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allocation` ADD CONSTRAINT `allocation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
