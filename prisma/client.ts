import { PrismaClient } from '@prisma/client'
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    // @ts-ignore
    if (!global.cachedPrisma) {
        // @ts-ignore
        global.cachedPrisma = new PrismaClient()
    }
    // @ts-ignore
    prisma = global.cachedPrisma
}

export const db = prisma