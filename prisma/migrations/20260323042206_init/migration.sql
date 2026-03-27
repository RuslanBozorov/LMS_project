/*
  Warnings:

  - You are about to drop the column `mentorProfileId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `SectionLessonId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `SectionLessonId` on the `ExamResult` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `MentorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `SectionLessonId` on the `StudentExamQuestion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lessonId,userId]` on the table `LessonView` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `MentorProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sectionLessonId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionLessonId` to the `ExamResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `MentorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionLessonId` to the `StudentExamQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_mentorProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_SectionLessonId_fkey";

-- DropForeignKey
ALTER TABLE "ExamResult" DROP CONSTRAINT "ExamResult_SectionLessonId_fkey";

-- DropForeignKey
ALTER TABLE "ExamResult" DROP CONSTRAINT "ExamResult_userId_fkey";

-- DropForeignKey
ALTER TABLE "LastActivity" DROP CONSTRAINT "LastActivity_courseId_fkey";

-- DropForeignKey
ALTER TABLE "LastActivity" DROP CONSTRAINT "LastActivity_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "LastActivity" DROP CONSTRAINT "LastActivity_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "MentorProfile" DROP CONSTRAINT "MentorProfile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionAnswer" DROP CONSTRAINT "QuestionAnswer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionAnswer" DROP CONSTRAINT "QuestionAnswer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "SectionLesson" DROP CONSTRAINT "SectionLesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "StudentExamQuestion" DROP CONSTRAINT "StudentExamQuestion_SectionLessonId_fkey";

-- DropForeignKey
ALTER TABLE "StudentExamQuestion" DROP CONSTRAINT "StudentExamQuestion_examId_fkey";

-- DropForeignKey
ALTER TABLE "StudentExamQuestion" DROP CONSTRAINT "StudentExamQuestion_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "mentorProfileId",
ALTER COLUMN "introVideo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "SectionLessonId",
ADD COLUMN     "sectionLessonId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ExamResult" DROP COLUMN "SectionLessonId",
ADD COLUMN     "sectionLessonId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "HomeWork" ALTER COLUMN "file" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LastActivity" ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "sectionId" DROP NOT NULL,
ALTER COLUMN "lessonId" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LessonView" ALTER COLUMN "view" SET DEFAULT false;

-- AlterTable
ALTER TABLE "MentorProfile" DROP COLUMN "user_id",
ADD COLUMN     "github" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "about" DROP NOT NULL,
ALTER COLUMN "job" DROP NOT NULL,
ALTER COLUMN "telegram" DROP NOT NULL,
ALTER COLUMN "instagram" DROP NOT NULL,
ALTER COLUMN "linkedin" DROP NOT NULL,
ALTER COLUMN "facebook" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "readAt" DROP NOT NULL,
ALTER COLUMN "readAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "StudentExamQuestion" DROP COLUMN "SectionLessonId",
ADD COLUMN     "sectionLessonId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LessonView_lessonId_userId_key" ON "LessonView"("lessonId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "MentorProfile_userId_key" ON "MentorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- AddForeignKey
ALTER TABLE "MentorProfile" ADD CONSTRAINT "MentorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LastActivity" ADD CONSTRAINT "LastActivity_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LastActivity" ADD CONSTRAINT "LastActivity_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "SectionLesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LastActivity" ADD CONSTRAINT "LastActivity_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionLesson" ADD CONSTRAINT "SectionLesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "SectionLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_sectionLessonId_fkey" FOREIGN KEY ("sectionLessonId") REFERENCES "SectionLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentExamQuestion" ADD CONSTRAINT "StudentExamQuestion_sectionLessonId_fkey" FOREIGN KEY ("sectionLessonId") REFERENCES "SectionLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentExamQuestion" ADD CONSTRAINT "StudentExamQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentExamQuestion" ADD CONSTRAINT "StudentExamQuestion_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_sectionLessonId_fkey" FOREIGN KEY ("sectionLessonId") REFERENCES "SectionLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAnswer" ADD CONSTRAINT "QuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAnswer" ADD CONSTRAINT "QuestionAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
