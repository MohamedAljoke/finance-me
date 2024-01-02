/*
  Warnings:

  - You are about to drop the column `userId` on the `currencies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `currencies` DROP FOREIGN KEY `currencies_userId_fkey`;

-- AlterTable
ALTER TABLE `currencies` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
