import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}
  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPersistence(question)

    await this.prisma.question.create({
      data,
    })
  }
  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPersistence(question)

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(question: Question): Promise<Question> {
    const data = PrismaQuestionMapper.toPersistence(question)

    const updatedQuestion = await this.prisma.question.update({
      data,
      where: {
        id: data.id,
      },
    })

    return PrismaQuestionMapper.toDomain(updatedQuestion)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findFirst({
      where: {
        slug,
      },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }
  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }
  async findManyRecent({
    page = 1,
    pageSize = 20,
  }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }
}
