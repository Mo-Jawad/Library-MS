import jwt from 'jsonwebtoken'
import env from 'dotenv'

const app = express()
env.config({
    path: './.env'
})

const LoggedUser = (req, res, next) => {
    try {
        const data = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        if(!data) return res.redirect('/login')
        req.user = data;
        next();
    } catch (error) {
        res.redirect('/login')
    }
}

module.exports = LoggedUser;