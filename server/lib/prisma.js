import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient()
}

/** @type {import('@prisma/client').PrismaClient} */
const prisma = globalForPrisma.prisma

export default prisma