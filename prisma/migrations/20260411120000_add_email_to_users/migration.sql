-- AlterTable
ALTER TABLE "Users" ADD COLUMN "email" TEXT;
ALTER TABLE "Users" ADD CONSTRAINT "Users_email_key" UNIQUE ("email");
ALTER TABLE "Users" ALTER COLUMN "phone" DROP NOT NULL;
