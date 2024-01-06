-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_receiverAccountId_fkey`;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `receiverAccountId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_receiverAccountId_fkey` FOREIGN KEY (`receiverAccountId`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
