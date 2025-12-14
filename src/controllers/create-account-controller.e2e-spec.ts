import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { Test } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@/env'

describe('Create account E2E', () => {
  let app: INestApplication
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(ConfigModule)
      .useModule(
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          validate: (env) => envSchema.parse(env),
        }),
      )
      .compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })
  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Dow',
      email: 'jhondoe@gmail.com',
      password: '12346',
    })
    expect(response.statusCode).toEqual(201)
  })
})
