import { Student } from '../../enterprise/entities/student'

export abstract class StudentRepository {
  abstract findByEmail(email: string): Promise<Student | null>
  abstract create(user: Student): Promise<Student>
}
