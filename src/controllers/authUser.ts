import { RequestHandler } from "express";
import * as authUser from '../services/authUser'
import bcrypt from 'bcrypt'
import { any, z } from "zod";
import { table } from "console";

export const register: RequestHandler = async (req, res) => {
    const createUserSchema = z.object({
        name: z.string(),
        password: z.string(),
        email: z.string().email(),
        cpf: z.string().transform(val => val.replace(/\.|-/gm, '')),
    })

    const body = createUserSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: 'Dados inválidos' }) }

    const randomPassword = await bcrypt.hash(body.data.password, 10)

    const newUser = await authUser.register({
        name: body.data.name,
        email: body.data.email,
        cpf: body.data.cpf,
        password: randomPassword
    })

    if (!newUser) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ user: newUser })
}

export const pong: RequestHandler = (req, res) => {
    res.json({ pong: true })
}