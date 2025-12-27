import { BadRequestException, PipeTransform } from '@nestjs/common'
import z, { ZodType } from 'zod'

export class ZodValidationPipe<T extends ZodType> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown): z.infer<T> {
    const result = this.schema.safeParse(value)

    if (!result.success) {
      const formattedErrors = z.flattenError(result.error)

      throw new BadRequestException({
        message: 'Validation failed',
        statusCode: 400,
        errors: formattedErrors.fieldErrors,
        formErrors: formattedErrors.formErrors,
      })
    }

    return result.data
  }
}
