// src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from 'src/generated/prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private pool: Pool

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })

    const adapter = new PrismaPg(pool)
    super({
      adapter,
      log: ['warn', 'error'],
    })

    this.pool = pool
  }

  async onModuleInit() {
    return await this.$connect()
  }
  async onModuleDestroy() {
    await this.pool.end()
    return await this.$disconnect()
  }
}
