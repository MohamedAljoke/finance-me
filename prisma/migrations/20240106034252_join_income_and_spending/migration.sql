/*
  Warnings:

  - You are about to drop the `income` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spending_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spendings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `income` DROP FOREIGN KEY `income_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `income` DROP FOREIGN KEY `income_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `income` DROP FOREIGN KEY `income_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE `income` DROP FOREIGN KEY `income_userId_fkey`;

-- DropForeignKey
ALTER TABLE `spending_category` DROP FOREIGN KEY `spending_category_userId_fkey`;

-- DropForeignKey
ALTER TABLE `spendings` DROP FOREIGN KEY `spendings_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `spendings` DROP FOREIGN KEY `spendings_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `spendings` DROP FOREIGN KEY `spendings_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE `spendings` DROP FOREIGN KEY `spendings_userId_fkey`;

-- DropTable
DROP TABLE `income`;

-- DropTable
DROP TABLE `spending_category`;

-- DropTable
DROP TABLE `spendings`;

-- CreateTable
CREATE TABLE `income_and_spending` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `symbol` VARCHAR(191) NULL,
    `amount` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `isScheduled` BOOLEAN NOT NULL DEFAULT false,
    `scheduleDate` DATETIME(3) NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `currencyId` VARCHAR(191) NOT NULL,
    `type` ENUM('INCOME', 'SPENDING') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `income_and_spending` ADD CONSTRAINT `income_and_spending_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income_and_spending` ADD CONSTRAINT `income_and_spending_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `income_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income_and_spending` ADD CONSTRAINT `income_and_spending_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income_and_spending` ADD CONSTRAINT `income_and_spending_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currencies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
