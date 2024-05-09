import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.table.findMany()
    } catch (error) { return false }
}

export const getOne = async (id: number) => {
    try {
        return await prisma.table.findFirst({ where: { id } })
    } catch (error) { return false }
}

type EventCreateType = Prisma.Args<typeof prisma.table, 'create'>['data']
export const addOne = async (data: EventCreateType) => {
    try {
        return await prisma.table.create({ data })
    } catch (erro) { return false }
}

type EventUpdateType = Prisma.Args<typeof prisma.table, 'update'>['data']
export const update = async (id: number, data: EventUpdateType) => {
    try {
        return await prisma.table.update({ where: { id }, data })
    } catch (error) {

    }
}

export const remove = async (id: number) => {
    try {
        return await prisma.table.delete({ where: { id } })
    } catch (error) { return false }
}