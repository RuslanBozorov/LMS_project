import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';

import { MentorProfileModule } from './module/mentor-profile/mentor-profile.module';
import { CourseCategoryModule } from './module/course-category/course-category.module';
import { CourseModule } from './module/course/course.module';
import { AssignedCourseModule } from './module/assigned-course/assigned-course.module';
import { PurchasedCourseModule } from './module/purchased-course/purchased-course.module';
import { RatingModule } from './module/rating/rating.module';
import { LastActivityModule } from './module/last-activity/last-activity.module';
import { SectionLessonModule } from './module/section-lesson/section-lesson.module';
import { LessonModule } from './module/lesson/lesson.module';
import { LessonViewModule } from './module/lesson-view/lesson-view.module';
import { LessonFileModule } from './module/lesson-file/lesson-file.module';
import { HomeworkModule } from './module/homework/homework.module';
import { HomeworkSubmissionModule } from './module/homework-submission/homework-submission.module';
import { ExamModule } from './module/exam/exam.module';
import { StudentExamQuestionModule } from './module/student-exam-question/student-exam-question.module';
import { ExamResultModule } from './module/exam-result/exam-result.module';
import { QuestionModule } from './module/question/question.module';
import { QuestionAnswerModule } from './module/question-answer/question-answer.module';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './module/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    MentorProfileModule,
    CourseCategoryModule,
    CourseModule,
    AssignedCourseModule,
    PurchasedCourseModule,
    RatingModule,
    LastActivityModule,
    SectionLessonModule,
    LessonModule,
    LessonViewModule,
    LessonFileModule,
    HomeworkModule,
    HomeworkSubmissionModule,
    ExamModule,
    StudentExamQuestionModule,
    ExamResultModule,
    QuestionModule,
    QuestionAnswerModule,
  ],
})
export class AppModule {}
