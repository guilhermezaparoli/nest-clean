import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student'
import { faker } from '@faker-js/faker'

export function makeStudent(override?: Partial<StudentProps>): Student {
  return Student.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    ...override,
  })
}
