import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch question E2E', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    await app.init()
  })
  test('[GET] /questions', async () => {
    const user = {
      name: 'Jhon Doe',
      email: 'jhondow@gmail.com',
      password: '123456',
    }

    const createdUser = await prisma.user.create({
      data: user,
    })

    const accessToken = jwt.sign({
      sub: createdUser.id,
    })

    await prisma.question.createMany({
      data: [
        {
          title: 'Question 01',
          slug: 'question-01',
          content: 'question 01',
          authorId: createdUser.id,
        },
        {
          title: 'Question 02',
          content: 'question 02',
          slug: 'question-02',
          authorId: createdUser.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: expect.any(String) }),
        expect.objectContaining({ title: expect.any(String) }),
      ],
    })
  })
})
