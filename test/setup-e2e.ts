import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'
import { PrismaClient } from 'generated/prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()
const databaseURL = generateUniqueDatabaseURL(schemaId)

process.env.DATABASE_URL = databaseURL
const adapter = new PrismaPg({ connectionString: databaseURL })
const prisma = new PrismaClient({ adapter })

beforeAll(async () => {
  execSync('pnpm prisma migrate deploy', {
    env: {
      ...process.env,
      DATABASE_URL: databaseURL,
    },
  })
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
