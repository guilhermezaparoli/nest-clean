import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

import { Attachment as PrismaAnswerAttachment } from 'generated/prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAnswerAttachment): AnswerAttachment {
    const { answerId, id, questionId, title, url } = raw

    if (!questionId) {
      throw new Error('Invalid attachment type.')
    }
    return AnswerAttachment.create(
      {
        answerId: new UniqueEntityID(answerId),
        attachmentId: new UniqueEntityID(id),
        title,
        url,
      },
      new UniqueEntityID(id),
    )
  }
}
