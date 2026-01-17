import { RegisterStudentUserUseCase } from '@/domain/forum/application/use-cases/register-student'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { UserRole } from 'generated/prisma/enums'
import z from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role: z.enum(UserRole),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>
@Controller('/accounts')
export class CreateAccountController {
  constructor(private readonly registerStudent: RegisterStudentUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { email, name, password, role } = body

    const result = await this.registerStudent.exec({
      email,
      name,
      password,
      role,
    })

    if (result.isLeft()) {
      throw new Error()
    }
  }
}
