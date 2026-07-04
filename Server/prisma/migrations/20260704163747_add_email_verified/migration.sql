/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "lastPasswordChangeAt" TIMESTAMP(3),
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OTP" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForgotPasswordToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForgotPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OTP_userId_idx" ON "OTP"("userId");

-- CreateIndex
CREATE INDEX "OTP_expiresAt_idx" ON "OTP"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "ForgotPasswordToken_token_key" ON "ForgotPasswordToken"("token");

-- CreateIndex
CREATE INDEX "ForgotPasswordToken_userId_idx" ON "ForgotPasswordToken"("userId");

-- CreateIndex
CREATE INDEX "ForgotPasswordToken_expiresAt_idx" ON "ForgotPasswordToken"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForgotPasswordToken" ADD CONSTRAINT "ForgotPasswordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
