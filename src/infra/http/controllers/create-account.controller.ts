import { StudentAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/student-already-exists'
import { RegisterStudentUserUseCase } from '@/domain/forum/application/use-cases/register-student'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
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
@Public()
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
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
