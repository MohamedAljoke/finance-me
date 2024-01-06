/*
  Warnings:

  - You are about to drop the `income_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `income_and_spending` DROP FOREIGN KEY `income_and_spending_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `income_category` DROP FOREIGN KEY `income_category_userId_fkey`;

-- DropTable
DROP TABLE `income_category`;

-- CreateTable
CREATE TABLE `income_and_spending_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `symbol` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `income_and_spending_categories` ADD CONSTRAINT `income_and_spending_categories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income_and_spending` ADD CONSTRAINT `income_and_spending_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `income_and_spending_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
