import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionCommentsRepository } from './prisma/respositories/prisma-question-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/respositories/prisma-question-atachments-repository'
import { PrismaAnswerAttachmentsRepository } from './prisma/respositories/prisma-answer-attachments-repository'
import { PrismaAnswerCommentsRepository } from './prisma/respositories/prisma-answer-comments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { PrismaQuestionsRepository } from './prisma/respositories/prisma-questions-repository'
import { StudentRepository } from '@/domain/forum/application/repositories/user-repository'
import { PrismaStudentsRepository } from './prisma/respositories/prisma-students-repository'
import { PrismaAnswerRepository } from './prisma/respositories/prisma-answers-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentRepository,
      useClass: PrismaStudentsRepository,
    },
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
  ],
})
export class DatabaseModule {}
