import express from 'express'
import http from 'http'
import cors from 'cors'
import 'dotenv/config'
import adminRouter from './routes/adminRouter'
import userRouter from './routes/userRouter'


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


let dateExp = '05/05/2024'
let date = Intl.DateTimeFormat('pt-br').format(new Date(dateExp))
console.log(date)