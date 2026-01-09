import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import type { PaginationParams } from '@/core/repositories/pagination-params'
import { right, type Either } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchRecentQuestionsUseCaseRequest extends PaginationParams {}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>
@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async exec({
    page = 1,
    pageSize = 20,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({
      page,
      pageSize,
    })

    return right({
      questions,
    })
  }
}
