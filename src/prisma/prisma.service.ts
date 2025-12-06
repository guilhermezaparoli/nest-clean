// src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from 'src/generated/prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  private pool: Pool

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })

    const adapter = new PrismaPg(pool)
    super({ adapter })

    this.pool = pool
  }

  async onModuleDestroy() {
    await this.pool.end()
    await this.$disconnect()
  }
}
