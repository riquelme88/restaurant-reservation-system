import { RequestHandler, query } from "express";
import * as authUser from '../services/authUser'
import * as users from '../services/users'
import bcrypt from 'bcrypt'
import { any, z } from "zod";
import { table } from "console";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const register: RequestHandler = async (req, res) => {
    const createUserSchema = z.object({
        name: z.string().min(2),
        password: z.string().min(8),
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
        password: randomPassword,
    })

    if (!newUser) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ user: newUser })
}

export const login: RequestHandler = async (req, res) => {
    const { password } = req.body

    const loginUserSchema = z.object({
        email: z.string().email(),
    })

    const body = loginUserSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: "Dados inválidos" }) }

    const user = await prisma.user.findFirst({ where: { email: body.data.email } })
    if (!user) {
        res.json({ error: 'Email ou senha inválidos' })
    }

    const matched = await bcrypt.compare(password, user?.password as string)
    if (!matched) {
        res.json({ error: 'Ocorreu algum erro' })
    }

    res.json({
        user: {
            email: user?.email,
            token: user?.token
        }
    })

}

export const privateRoute: RequestHandler = async (req, res, next) => {

    if (!req.query.token && !req.body.token) {
        res.json({ notAllowed: true })
        return
    }

    let token = ''
    if (req.query.token) {
        token = req.query.token as string
    }
    if (req.body.token) {
        token = req.body.token
    }

    if (token == '') {
        res.json({ notAllowed: true })
        return
    }

    const user = await users.getOne({ token })
    if (!user) {
        res.json({ notAllowed: true })
        return
    }

    next()
}

export const pong: RequestHandler = (req, res) => {
    res.json({ pong: true })
}