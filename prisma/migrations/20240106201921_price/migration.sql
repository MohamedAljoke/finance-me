/*
  Warnings:

  - You are about to drop the column `amount` on the `investment_stocks` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `stock_and_real_state_transactions` table. All the data in the column will be lost.
  - Added the required column `price` to the `investment_stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `stock_and_real_state_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investment_stocks` DROP COLUMN `amount`,
    ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `stock_and_real_state_transactions` DROP COLUMN `amount`,
    ADD COLUMN `price` DOUBLE NOT NULL;
