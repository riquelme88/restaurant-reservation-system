import express from 'express'
import http from 'http'
import cors from 'cors'
import 'dotenv/config'
import adminRouter from './routes/adminRouter'
import userRouter from './routes/userRouter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express()
const server = new http.Server(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const port = parseInt(process.env.PORT as string)

app.use('/', userRouter)
app.use('/admin', adminRouter)

app.listen(port, () => {
    console.log('Running at time in PORT: ', port)
})

const showHours = async () => {
    const hour = await prisma.hours.findMany()
    for (let i in hour) {
        let day = hour[i].day
        let dayArray = day.split('/')
        dayArray.reverse()
        day = dayArray.join('/')
        let dateBase = new Date(day)
        let dateNow = new Date()
        if (dateNow.getTime() > dateBase.getTime()) {
            console.log('deu bom')
            day = Intl.DateTimeFormat('pt-br').format(new Date)
            console.log(day)
        }

    }

}
showHours()

