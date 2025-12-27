import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import z from 'zod'

const pageParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))
const pageParamSchemaValidation = new ZodValidationPipe(pageParamSchema)

type PageParamsType = z.infer<typeof pageParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async handle(@Query('page', pageParamSchemaValidation) page: PageParamsType) {
    const perPage = 20

    const questions = await this.prismaService.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return {
      questions,
    }
  }
}
