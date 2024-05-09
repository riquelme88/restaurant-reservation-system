import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export const getAll = async () => {
    try {
        return await prisma.user.findMany()
    } catch (error) { return false }
}

export const getOne = async (id: number) => {
    try {
        return await prisma.user.findFirst({ where: { id } })
    } catch (error) { return false }
}

type EventUpdateFilter = Prisma.Args<typeof prisma.user, 'update'>['data']
export const update = async (id: number, data: EventUpdateFilter) => {
    try {
        return await prisma.user.update({ where: { id }, data })
    } catch (error) { return false }
}

export const remove = async (id: number) => {
    try {
        return await prisma.user.delete({ where: { id } })
    } catch (error) { return false }
}