/*
  Warnings:

  - You are about to drop the `_RolesToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_RolesToUser` DROP FOREIGN KEY `_RolesToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_RolesToUser` DROP FOREIGN KEY `_RolesToUser_B_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `_RolesToUser`;

-- DropTable
DROP TABLE `roles`;
