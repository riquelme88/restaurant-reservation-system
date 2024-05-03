import { Router } from "express";
import * as auth from '../controllers/auth'
import * as cupom from '../controllers/cupom'
import * as hour from '../controllers/hour'

const router = Router()

router.post('/login', auth.login)

router.get('/cupom', auth.validate, cupom.getAll)
router.get('/cupom/:id', auth.validate, cupom.getOne)
router.post('/cupom', auth.validate, cupom.addCupom)
router.put('/cupom/:id', auth.validate, cupom.updateOne)
router.delete('/cupom/:id', auth.validate, cupom.remove)

router.get('/hour', auth.validate, hour.getAll)
router.get('/hour/:id', auth.validate, hour.getOne)
router.post('/hour', auth.validate, hour.addHour)
router.put('/hour/:id', auth.validate, hour.updateOne)
router.delete('/hour/:id', auth.validate, hour.remove)



export default router