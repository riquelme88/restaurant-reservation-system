import z from 'zod'
import { RequestHandler } from 'express'
import * as auth from '../services/auth'

export const login: RequestHandler = (req, res) => {
    const { password } = req.body

    const loginSchema = z.object({
        password: z.string()
    });

    const body = loginSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: 'Dados invalidos' }) }

    if (auth.validateLogin(password)) {
        return res.json({ token: auth.createToken() })
    }

    res.status(403).json({ error: 'Acesso negado' })
}

export const validate: RequestHandler = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.json({ error: "Acesso negado" })
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!auth.validateToken(token)) { res.status(403).json({ error: 'Acesso negado' }) }

    next()
}