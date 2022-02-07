/*
  Warnings:

  - Made the column `userId` on table `UserTask` required. This step will fail if there are existing NULL values in that column.
  - Made the column `taskId` on table `UserTask` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserTask" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "taskId" SET NOT NULL;
