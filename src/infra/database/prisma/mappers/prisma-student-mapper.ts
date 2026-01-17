import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { User } from 'generated/prisma/client'

export class PrismaStudentMapper {
  static toDomain(raw: User): Student {
    const { email, id, name, password, role } = raw
    return Student.create(
      {
        email,
        name,
        password,
        role,
      },
      new UniqueEntityID(id),
    )
  }
  static toPersistance(student: Student): User {
    const { email, id, name, password, role } = student

    return {
      id: id.toString(),
      email,
      name,
      password,
      role,
    }
  }
}
