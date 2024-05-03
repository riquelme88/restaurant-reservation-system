import { RequestHandler } from "express";
import * as hours from '../services/hour'
import { z } from "zod";
import { error } from "console";

export const getAll: RequestHandler = async (req, res) => {
    const allHours = await hours.getAll()

    if (!allHours) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ hours: allHours })
}

export const getOne: RequestHandler = async (req, res) => {
    const { id } = req.params

    const hour = await hours.getOne(parseInt(id))

    if (!hour) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ hour: hour })
}

export const addHour: RequestHandler = async (req, res) => {
    const createHourSchema = z.object({
        hour: z.string(),
        day: z.string()
    })

    const body = createHourSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: 'Dados inválidos' }) }

    const newHour = await hours.addHour({
        day: body.data.day,
        hour: body.data.hour
    })

    res.json({ hours: newHour })
}

export const updateOne: RequestHandler = async (req, res) => {
    const { id } = req.params
    const updateHourSchema = z.object({
        hour: z.string().optional(),
        day: z.string().optional()
    })

    const body = updateHourSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: 'Dados inválidos' }) }

    const updateHour = await hours.update(parseInt(id), {
        day: body.data.day,
        hour: body.data.hour
    })

    if (!updateHour) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ hours: updateHour })
}

export const remove: RequestHandler = async (req, res) => {
    const { id } = req.params

    const deleteHour = await hours.remove(parseInt(id))

    if (!deleteHour) { return res.json({ error: "Ocorreu algum erro" }) }

    res.json({ hours: deleteHour })
}