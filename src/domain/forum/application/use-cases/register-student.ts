import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../cryptography/hash-generator'
import { Student } from '../../enterprise/entities/student'
import { Either, left, right } from '@/core/either'
import { StudentRepository } from '../repositories/user-repository'
import { StudentAlreadyExistsError } from './errors/student-already-exists'
import { UserRole } from 'generated/prisma/enums'

interface RegisterStudentUseCaseRequest {
  name: string
  password: string
  email: string
  role: UserRole
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUserUseCase {
  constructor(
    private readonly studentRepository: StudentRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async exec({
    email,
    name,
    password,
    role,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const userWithSameEmail = await this.studentRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      email,
      name,
      password: hashedPassword,
      role,
    })

    await this.studentRepository.create(student)

    return right({
      student,
    })
  }
}
