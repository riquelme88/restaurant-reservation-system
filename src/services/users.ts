import { Prisma, PrismaClient } from "@prisma/client";
import * as hour from '../services/hour'

const prisma = new PrismaClient()


export const getAll = async () => {
    try {
        return await prisma.user.findMany()
    } catch (error) { return false }
}

type FilterGetOne = { id?: number, token?: string }
export const getOne = async (filters: FilterGetOne) => {
    try {
        return await prisma.user.findFirst({ where: filters })
    } catch (error) { return false }
}

/*export const updateRelations = async () => {
    try {
        const hour = await prisma.hours.findMany()
        for (let i in hour) {
            let day = hour[i].day
            let dayArray = day.split('/')
            dayArray.reverse()
            day = dayArray.join('/')
            let dateBase = new Date(day)
            let dateNow = new Date()
            if (dateNow.getTime() > dateBase.getTime()) {
                return await prisma.user.updateMany({ data: { tableId: null, hoursId: null } })
            }
        }
    } catch (error) {
        return false
    }
}*/

type EventUpdateFilter = Prisma.Args<typeof prisma.user, 'update'>['data']
type FilterUpdateOne = { id: number, token: string }

export const update = async (filters: FilterUpdateOne, data: EventUpdateFilter) => {
    try {
        return await prisma.user.update({ where: filters, data })
    } catch (error) { return false }
}
export const remove = async (id: number) => {
    try {
        return await prisma.user.delete({ where: { id } })
    } catch (error) { return false }
}


export const addCupomInUser = async (id: number, data: EventUpdateFilter) => {
    try {
        const user = await prisma.user.findFirst({ where: { id } })
        if (user?.priceUsed as number >= 200 && user?.priceUsed as number < 350) {
            return await prisma.user.update({ where: { id }, data: { cupomId: 4 } })
        } else if (user?.priceUsed as number >= 350 && user?.priceUsed as number < 500) {
            return await prisma.user.update({ where: { id }, data: { cupomId: 2 } })
        } else if (user?.priceUsed as number >= 500 && user?.priceUsed as number < 1000) {
            return await prisma.user.update({ where: { id }, data: { cupomId: 3 } })
        } else if (user?.priceUsed as number >= 1000) {
            return await prisma.user.update({ where: { id }, data: { cupomId: 1 } })
        }
    } catch (error) { return false }
}