import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Question as PrismaQuestion } from 'generated/prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    const { authorId, title, content, slug, createdAt, updatedAt, id } = raw

    return Question.create(
      {
        authorId: new UniqueEntityID(authorId),
        content,
        title,
        bestAnswerId: undefined,
        slug: Slug.create(slug),
        createdAt,
        updatedAt,
      },
      new UniqueEntityID(id),
    )
  }
}
