import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Prisma } from 'generated/prisma/browser'
import { Question as PrismaQuestion } from 'generated/prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    const {
      authorId,
      title,
      content,
      slug,
      createdAt,
      updatedAt,
      id,
      bestAnswerId,
    } = raw

    return Question.create(
      {
        authorId: new UniqueEntityID(authorId),
        content,
        title,
        bestAnswerId: bestAnswerId ? new UniqueEntityID(bestAnswerId) : null,
        slug: Slug.create(slug),
        createdAt,
        updatedAt,
      },
      new UniqueEntityID(id),
    )
  }

  static toPersistence(raw: Question): Prisma.QuestionUncheckedCreateInput {
    const {
      authorId,
      title,
      content,
      slug,
      createdAt,
      updatedAt,
      id,
      bestAnswerId,
    } = raw
    return {
      id: id.toString(),
      authorId: authorId.toString(),
      bestAnswerId: bestAnswerId?.toString() ?? null,
      content,
      title,
      slug: slug.value,
      createdAt,
      updatedAt: updatedAt ?? null,
    }
  }
}
