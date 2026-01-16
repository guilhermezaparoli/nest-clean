import { StudentRepository } from '@/domain/forum/application/repositories/user-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentRepository implements StudentRepository {
  items: Student[] = []

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.items.find((student) => student.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async create(user: Student): Promise<Student> {
    this.items.push(user)
    return user
  }
}
