-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_senderAccountId_fkey`;

-- AlterTable
ALTER TABLE `transaction` MODIFY `senderAccountId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_senderAccountId_fkey` FOREIGN KEY (`senderAccountId`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
