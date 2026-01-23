import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Prisma } from 'generated/prisma/browser'
import { Answer as PrismaAnswer } from 'generated/prisma/client'

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    const { authorId, content, createdAt, questionId, updatedAt, id } = raw

    return Answer.create(
      {
        authorId: new UniqueEntityID(authorId),
        content,
        createdAt,
        updatedAt,
        questionId: new UniqueEntityID(questionId),
      },
      new UniqueEntityID(id),
    )
  }

  static toPersistence(raw: Answer): Prisma.AnswerUncheckedCreateInput {
    const { authorId, content, createdAt, updatedAt, id, questionId } = raw
    return {
      id: id.toString(),
      authorId: authorId.toString(),
      content,
      createdAt,
      updatedAt: updatedAt ?? null,
      questionId: questionId.toString(),
    }
  }
}
