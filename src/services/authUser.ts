import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type EventCreateData = Prisma.Args<typeof prisma.user, 'create'>['data']
export const register = async (data: EventCreateData) => {
    try {
        return await prisma.user.create({ data })
    } catch (error) { return false }
}