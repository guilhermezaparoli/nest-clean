// src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'generated/prisma/client'
import { Pool } from 'pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private pool: Pool

  constructor() {
    const url = new URL(process.env.DATABASE_URL!)
    const schema = url.searchParams.get('schema') || 'public'

    url.searchParams.delete('schema')

    const pool = new Pool({
      connectionString: url.toString(),
    })

    const adapter = new PrismaPg(pool, {
      schema,
    })

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
