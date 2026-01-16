import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { AuthenticateStudentUserUseCase } from './authenticate-student'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeStudent } from 'test/factories/make-student'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let sut: AuthenticateStudentUserUseCase
let studentRepository: InMemoryStudentRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

describe('Authenticate Student Use Case', () => {
  beforeEach(() => {
    studentRepository = new InMemoryStudentRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUserUseCase(
      studentRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'teste1@gmail.com',
      password: await fakeHasher.hash('123456'),
    })

    studentRepository.items.push(student)

    const result = await sut.exec({
      email: student.email,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
  it('should not be able to authenticate a student with wrong password', async () => {
    const student = makeStudent({
      email: 'teste1@gmail.com',
      password: await fakeHasher.hash('123456'),
    })

    studentRepository.items.push(student)

    const result = await sut.exec({
      email: student.email,
      password: '1234567',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
