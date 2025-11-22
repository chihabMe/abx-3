
import { hashPassword } from '@/lib/passwords'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config() // ✅ Load env variables from .env

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const rawPassword = process.env.ADMIN_PASSWORD

  if (!email || !rawPassword) {
    throw new Error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env')
  }

  const password = await hashPassword(rawPassword)

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password,
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
