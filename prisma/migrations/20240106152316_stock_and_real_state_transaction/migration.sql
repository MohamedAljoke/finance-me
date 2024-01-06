/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_receiverAccountId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_senderAccountId_fkey`;

-- DropTable
DROP TABLE `Transaction`;

-- CreateTable
CREATE TABLE `transaction` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `amount` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `senderAccountId` VARCHAR(191) NOT NULL,
    `receiverAccountId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `investment_fixed_income` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `investmentStartDate` DATETIME(3) NOT NULL,
    `investmentDueDate` DATETIME(3) NOT NULL,
    `incomeTaxPercentage` DOUBLE NOT NULL,
    `amount` DOUBLE NOT NULL,
    `type` ENUM('CDB', 'CDI', 'IPCA', 'PREFIXADO', 'LCI', 'LCA', 'LC', 'LF', 'CRI', 'CRA', 'Debentures', 'DPGE', 'Outros') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `investment_stocks` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `investmentStartDate` DATETIME(3) NOT NULL,
    `investmentDueDate` DATETIME(3) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `stocksAmount` DOUBLE NOT NULL,
    `type` ENUM('CDB', 'CDI', 'IPCA', 'PREFIXADO', 'LCI', 'LCA', 'LC', 'LF', 'CRI', 'CRA', 'Debentures', 'DPGE', 'Outros') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_and_real_state_transactions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `amount` DOUBLE NOT NULL,
    `stocksAmount` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_senderAccountId_fkey` FOREIGN KEY (`senderAccountId`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_receiverAccountId_fkey` FOREIGN KEY (`receiverAccountId`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investment_fixed_income` ADD CONSTRAINT `investment_fixed_income_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investment_stocks` ADD CONSTRAINT `investment_stocks_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_and_real_state_transactions` ADD CONSTRAINT `stock_and_real_state_transactions_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
