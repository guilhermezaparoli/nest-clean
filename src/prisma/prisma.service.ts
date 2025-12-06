// src/prisma/prisma.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from 'src/generated/prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const pool = new Pool({
      user: 'postgres',
      password: 'docker',
      host: 'localhost',
      port: 5432,
      database: 'nest-clean',
    })

    const adapter = new PrismaPg(pool)
    super({ adapter })
  }
}
