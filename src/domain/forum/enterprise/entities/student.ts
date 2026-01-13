import { Entity } from '@/core/entities/entity'

interface StudentProps {
  name: string
  email: string
  password: string
}
export class Student extends Entity<StudentProps> {
  get name() {
    return this.name
  }

  get email() {
    return this.email
  }

  get password() {
    return this.password
  }
  static create(props: StudentProps) {
    const student = new Student({
      ...props,
    })

    return student
  }
}
