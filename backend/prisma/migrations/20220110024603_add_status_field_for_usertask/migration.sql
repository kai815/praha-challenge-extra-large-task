-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('NotStarted', 'InReview', 'Completed');

-- AlterTable
ALTER TABLE "UserTask" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT E'NotStarted';
