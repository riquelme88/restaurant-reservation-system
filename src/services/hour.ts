import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.hours.findMany()
    } catch (error) { return false }
}

export const getOne = async (id: number) => {
    try {
        return await prisma.hours.findFirst({ where: { id } })
    } catch (error) { return false }
}

type EventCreateType = Prisma.Args<typeof prisma.hours, 'create'>['data']
export const addHour = async (data: EventCreateType) => {
    try {
        return await prisma.hours.create({ data })
    } catch (error) { return false }
}

type EventUpdateType = Prisma.Args<typeof prisma.hours, 'update'>['data']
export const update = async () => {
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
                return await prisma.hours.updateMany({
                    data: {
                        day: Intl.DateTimeFormat('pt-br').format(new Date)
                    }
                })
            }
        }
    } catch (error) {
        return false
    }
}

export const remove = async (id: number) => {
    try {
        return await prisma.hours.delete({ where: { id } })
    } catch (error) { return false }
}