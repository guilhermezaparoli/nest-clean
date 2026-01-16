import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { RegisterStudentUserUseCase } from './register-student'

let sut: RegisterStudentUserUseCase
let studentRepository: InMemoryStudentRepository
let fakeHasher: FakeHasher

describe('Register Student Use Case', () => {
  beforeEach(() => {
    studentRepository = new InMemoryStudentRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUserUseCase(studentRepository, fakeHasher)
  })

  it('should be able to register a student', async () => {
    const result = await sut.exec({
      email: 'teste1@gmail.com',
      name: 'teste2',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: studentRepository.items[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.exec({
      email: 'teste1@gmail.com',
      name: 'teste2',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')
    expect(result.isRight()).toBe(true)
    expect(studentRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to register a student with same e-mail', async () => {
    const student = makeStudent({
      email: 'teste1@gmail.com',
    })

    studentRepository.items.push(student)

    const result = await sut.exec({
      email: 'teste1@gmail.com',
      name: 'teste2',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
  })
})
