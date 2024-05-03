import { RequestHandler } from "express";
import * as cupom from '../services/cupom'
import { z } from "zod";
import { error } from "console";

export const getAll: RequestHandler = async (req, res) => {
    const allCupons = await cupom.getAll()

    if (!allCupons) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ cupom: allCupons })
}

export const getOne: RequestHandler = async (req, res) => {
    const { id } = req.params

    const oneCupom = await cupom.getOne({ id: parseInt(id) })
    if (!oneCupom) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ cupom: oneCupom })
}

export const addCupom: RequestHandler = async (req, res) => {
    const cupomCreateSchema = z.object({
        price: z.number()
    })

    const body = cupomCreateSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: "Dados invalidos" }) }

    const newCupom = await cupom.addOne({
        price: body.data.price
    })

    res.json({ cupom: newCupom })
}

export const updateOne: RequestHandler = async (req, res) => {
    const { id } = req.params

    const updateCupomSchema = z.object({
        dateExp: z.string().optional()
    })

    const body = updateCupomSchema.safeParse(req.body)
    if (!body.success) { return res.json({ error: 'Dados inválidos' }) };

    const updateCupom = await cupom.update(parseInt(id), {
        dateExp: body.data.dateExp
    })
    if (!updateCupom) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ cupom: updateCupom })


}

export const remove: RequestHandler = async (req, res) => {
    const { id } = req.params

    const deleteCupom = await cupom.remove({ id: parseInt(id) })

    if (!deleteCupom) { return res.json({ error: 'Ocorreu algum erro' }) }

    res.json({ cupom: deleteCupom })
}