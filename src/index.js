import express from 'express'
import env from 'dotenv'
import { connection } from './db/connection.js'
import authRoute from './routes/auth.routes.js'
import bookRoute from './routes/book.routes.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import path from 'path'
import { logoutFunc, verifyLogin } from './middleware/authrole.js'

const app = express()
env.config({
    path: './.env'
})
connection()

app.use(cookieParser())
app.use(session({ 
    secret: process.env.SECRET_KEY, 
    resave: true, 
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using https
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(import.meta.dirname, 'public')))

const port = process.env.PORT || 3000


app.use('/', authRoute)
app.use('/logout', logoutFunc)
app.use('/book', bookRoute)

app.listen(port)

