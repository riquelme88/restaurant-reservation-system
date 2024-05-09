import { Router } from "express";
import * as adminRouter from "./adminRouter";
import * as authUser from '../controllers/authUser'
import * as users from '../controllers/users'
import * as reserves from '../controllers/reserves'


const router = Router()

router.get('/ping', authUser.pong)
router.post('/register', authUser.register)
//router.put('/update/:id', users.updateOne)

router.put('/tables/:id', reserves.table)
router.put('/hours/:id', reserves.hour)


export default router