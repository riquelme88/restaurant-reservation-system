import { RequestHandler } from "express";
import { z } from "zod";
import * as users from '../services/users'

export const table: RequestHandler = async (req, res) => {
    const { id } = req.params

    const reserveTableSchema = z.object({
        tableId: z.number().optional()
    })

    const body = reserveTableSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: 'Dados inválidos' }) }

    const reservedTable = await users.update(parseInt(id), {
        tableId: body.data.tableId
    })

    if (!reservedTable) { return res.json({ error: "Ocorreu algum erro" }) }

    res.json({
        userReservedTable: {
            name: reservedTable.name,
            tableId: reservedTable.tableId,
            cpf: reservedTable.cpf
        }
    })
}

export const hour: RequestHandler = async (req, res) => {
    const { id } = req.params

    const reserveHourSchema = z.object({
        hourId: z.number().optional()
    })

    const body = reserveHourSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: 'Dados inválidos' }) }

    const reservedHour = await users.update(parseInt(id), { hoursId: body.data.hourId })
    if (!reservedHour) { return res.json({ error: "Ocorreu algum erro" }) }

    res.json({
        userReservedHour: {
            name: reservedHour.name,
            tableId: reservedHour.hoursId,
            cpf: reservedHour.cpf
        }
    })
}