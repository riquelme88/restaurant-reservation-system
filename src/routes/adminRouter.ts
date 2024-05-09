import { Router } from "express";
import * as auth from '../controllers/auth'
import * as cupom from '../controllers/cupom'
import * as hour from '../controllers/hour'
import * as table from '../controllers/table'
import * as users from '../controllers/users'

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

router.get('/table', auth.validate, table.getAll)
router.get('/table/:id', auth.validate, table.getOne)
router.post('/table', auth.validate, table.addTable)
router.put('/table/:id', auth.validate, table.updateOne)
router.delete('/table/:id', auth.validate, table.remove)

router.get('/users', auth.validate, users.getAll)
router.get('/user/:id', auth.validate, users.getOne)
router.put('/user/:id', auth.validate, users.updateOne)
router.delete('/user/:id', auth.validate, users.remove)



export default router