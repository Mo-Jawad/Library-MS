import { Router } from "express";
import {userModel} from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})
const router = Router()


router.route('/').get((req, res) => {
    res.status(200).json({
        'message': 'bye bye babe'
    })
})

router.route('/signup').post(async (req, res) => {

    try {
        const {name, email, password, role} = req.body

    if(!name || !email || !password || !role) {
        return res.status(404).json({
            message: 'fill All the fields'
        })
    }

    bcrypt.hash(password, 10, async function(err, hash) {
        if(!err) {
        const createUser = await userModel.create({
        name,
        email,
        password: hash,
        role
    })

        await createUser.save()

        
        return res.status(200).json({
        user: createUser
    })
} else {
    return res.status(404).json({
        massage: 'error in ncreated user'
    })
}
    });

    

    
    } catch (error) {
         return res.status(500).json({
            message: 'Internal server error',
            error: error.message
    });
    }
    
})


router.route('/login').get((req, res) => {
    res.status(200).json({
        message: 'you have to login first.'
    })
})

router.route('/login').post(async (req, res) => {
    try {
        const { email, password } = req.body;

    if(!email || !password) {
         return res.status(404).json({
            message: 'fill All the fields'
        })
    }

    const theUser = await userModel.findOne({ email });



    if(!theUser) {

        return res.status(404).json({
        message: 'something went wrong!'
    })
    }

    // check and compare this password true or false

    const matchPass = await bcrypt.compare(password, theUser.password);

    if(matchPass) {

        const token = jwt.sign({id: theUser._id,name: theUser.name, role: theUser.role}, process.env.SECRET_KEY)

        return res.status(200).json({
        message: 'you loggedin successfully',
        token,
    })

    
    } else {
        return res.status(200).json({
        message: 'something went wrong',
        user: theUser
    })
    }

    } catch (error) {
        return res.status(500).json({
        message: 'something went wrong'
    })
    }
    
})





export default router