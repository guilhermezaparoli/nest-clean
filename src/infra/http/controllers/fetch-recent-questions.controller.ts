import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import z from 'zod'
import { HttpQuestionPresenter } from '../presenters/http-question-presenter'

const pageParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))
const pageParamSchemaValidation = new ZodValidationPipe(pageParamSchema)

type PageParamsType = z.infer<typeof pageParamSchema>

@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query('page', pageParamSchemaValidation) page: PageParamsType) {
    const result = await this.fetchRecentQuestions.exec({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { questions } = result.value

    return {
      questions: questions.map(HttpQuestionPresenter.toHTTP),
    }
  }
}
