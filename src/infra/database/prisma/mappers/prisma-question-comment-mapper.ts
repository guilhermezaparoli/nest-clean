import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Prisma } from 'generated/prisma/browser'
import { Comment as PrismaQuestionComment } from 'generated/prisma/client'

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaQuestionComment): QuestionComment {
    const { authorId, content, createdAt, questionId, updatedAt, id } = raw

    if (!questionId) {
      throw new Error('Invalid comment type.')
    }

    return QuestionComment.create(
      {
        authorId: new UniqueEntityID(authorId),
        questionId: new UniqueEntityID(questionId),
        content,
        createdAt,
        updatedAt,
      },
      new UniqueEntityID(id),
    )
  }

  static toPersistence(
    raw: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    const { authorId, content, createdAt, updatedAt, id, questionId } = raw
    return {
      id: id.toString(),
      authorId: authorId.toString(),
      questionId: questionId.toString(),
      content,
      createdAt,
      updatedAt: updatedAt ?? null,
    }
  }
}
