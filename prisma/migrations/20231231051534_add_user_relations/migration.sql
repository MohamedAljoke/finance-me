/*
  Warnings:

  - Added the required column `userId` to the `currencies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `income_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `spending_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `currencies` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `income_category` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `spending_category` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `currencies` ADD CONSTRAINT `currencies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spending_category` ADD CONSTRAINT `spending_category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income_category` ADD CONSTRAINT `income_category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
