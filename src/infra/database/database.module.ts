import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepository } from './prisma/respositories/prisma-questions-repository'
import { PrismaQuestionCommentsRepository } from './prisma/respositories/prisma-question-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/respositories/prisma-question-atachments-repository'
import { PrismaAnswerRepository } from './prisma/respositories/prisma-answer-repository'
import { PrismaAnswerAttachmentsRepository } from './prisma/respositories/prisma-answer-attachments-repository'
import { PrismaAnswerCommentsRepository } from './prisma/respositories/prisma-answer-comments-repository'

@Module({
  providers: [
    PrismaService,
    PrismaQuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
  ],
  exports: [
    PrismaService,
    PrismaQuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
  ],
})
export class DatabaseModule {}
