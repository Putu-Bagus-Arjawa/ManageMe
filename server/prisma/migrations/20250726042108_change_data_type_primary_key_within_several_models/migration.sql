/*
  Warnings:

  - The primary key for the `allocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `eating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `allocation` DROP FOREIGN KEY `allocation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `eating` DROP FOREIGN KEY `eating_userId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- AlterTable
ALTER TABLE `allocation` DROP PRIMARY KEY,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`userId`, `allocation_day`);

-- AlterTable
ALTER TABLE `eating` DROP PRIMARY KEY,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`userId`, `day`);

-- AlterTable
ALTER TABLE `task` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `userId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eating` ADD CONSTRAINT `eating_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allocation` ADD CONSTRAINT `allocation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
