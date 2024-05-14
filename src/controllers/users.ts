import { RequestHandler } from "express";
import * as users from '../services/users'
import { error, table } from "console";
import { z } from "zod";
import bcrypt from 'bcrypt'
import { update } from "../services/cupom";

export const remove: RequestHandler = async (req, res) => {
    const { id } = req.params

    const deleteUser = await users.remove(parseInt(id))
    if (!deleteUser) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ user: deleteUser })
}

export const getAll: RequestHandler = async (req, res) => {
    //await users.updateRelations()
    const user = await users.getAll()
    if (!user) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ user: user })
}

export const getOne: RequestHandler = async (req, res) => {
    //await users.updateRelations()
    const { id } = req.params

    const user = await users.getOne({ id: parseInt(id) })
    if (!user) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ user: user })
}

export const updateOne: RequestHandler = async (req, res) => {
    const { id } = req.params

    const updateUserSchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        cpf: z.string().transform(val => val.replace(/\.|-/gm, '')).optional(),
        password: z.string().optional(),
        priceUsed: z.number().optional(),
        tableId: z.number().optional(),
        hoursId: z.number().optional(),
        cupomId: z.number().optional(),
        token: z.string()
    })

    const body = updateUserSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: 'Dados inválidos' }) };

    const updateUser = await users.update({ id: parseInt(id), token: body.data.token }, {
        name: body.data.name,
        email: body.data.email,
        cpf: body.data.cpf,
        tableId: body.data.tableId,
        hoursId: body.data.hoursId,
        cupomId: body.data.cupomId,
        priceUsed: body.data.priceUsed

    })

    if (!updateUser) { return res.json({ error: 'Ocorreu algum erro' }) }

    await users.addCupomInUser(parseInt(id), {})

    res.json({
        user: {
            id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
            cpf: updateUser.cpf,
            priceUsed: updateUser.priceUsed,
            tableId: updateUser.tableId,
            hoursId: updateUser.hoursId,
            cupomId: updateUser.cupomId
        }
    })
}