import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.cupom.findMany()
    } catch (error) { return false }
}
type FilterGetOne = { id: number }
export const getOne = async (filter: FilterGetOne) => {
    try {
        return await prisma.cupom.findFirst({ where: filter })
    } catch (error) { return false }
}

type EventsCreateData = Prisma.Args<typeof prisma.cupom, 'create'>['data']
export const addOne = async (data: EventsCreateData) => {
    try {
        return await prisma.cupom.create({ data })
    } catch (error) { return false }
}

type FilterDeleteOne = { id: number }
export const remove = async (filter: FilterDeleteOne) => {
    try {
        return await prisma.cupom.delete({ where: filter })
    } catch (error) { return false }
}

type EventsUpdateData = Prisma.Args<typeof prisma.cupom, 'update'>['data']
export const update = async (id: number, data: EventsUpdateData) => {
    try {
        return await prisma.cupom.update({ where: { id }, data })
    } catch (error) {
        return false
    }
}