import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Prisma } from 'generated/prisma/browser'
import { Comment as PrismaAnswerComment } from 'generated/prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaAnswerComment): AnswerComment {
    const { authorId, content, createdAt, answerId, updatedAt, id } = raw

    if (!answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerComment.create(
      {
        authorId: new UniqueEntityID(authorId),
        answerId: new UniqueEntityID(answerId),
        content,
        createdAt,
        updatedAt,
      },
      new UniqueEntityID(id),
    )
  }

  static toPersistence(raw: AnswerComment): Prisma.CommentUncheckedCreateInput {
    const { authorId, content, createdAt, updatedAt, id, answerId } = raw
    return {
      id: id.toString(),
      authorId: authorId.toString(),
      answerId: answerId.toString(),
      content,
      createdAt,
      updatedAt: updatedAt ?? null,
    }
  }
}
