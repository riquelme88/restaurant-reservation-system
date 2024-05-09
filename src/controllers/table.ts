import { RequestHandler } from "express";
import * as table from '../services/table'
import { error } from "console";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const allTables = await table.getAll()
    if (!allTables) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ table: allTables })
}

export const getOne: RequestHandler = async (req, res) => {
    const { id } = req.params

    const oneTable = await table.getOne(parseInt(id))
    if (!oneTable) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ table: oneTable })
}

export const addTable: RequestHandler = async (req, res) => {
    const createTableSchema = z.object({
        tableNumber: z.number(),
        qtPeople: z.number()
    })

    const body = createTableSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: "Dados inválidos" }) }

    const newTable = await table.addOne({ tableNumber: body.data.tableNumber, qtPeople: body.data.qtPeople })
    if (!newTable) { return res.json({ error: "Ocorreu algum erro" }) }

    res.json({ table: newTable })
}

export const updateOne: RequestHandler = async (req, res) => {
    const { id } = req.params

    const updateTableSchema = z.object({
        tableNumber: z.number().optional(),
        qtPeople: z.number().optional()
    })

    const body = updateTableSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: 'Dados inválidos' }) }

    const updateTable = await table.update(parseInt(id), {
        tableNumber: body.data.tableNumber,
        qtPeople: body.data.qtPeople
    })
    if (!updateTable) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ table: updateTable })
}

export const remove: RequestHandler = async (req, res) => {
    const { id } = req.params

    const deleteTable = await table.remove(parseInt(id))
    if (!deleteTable) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ table: deleteTable })
}