import { Router } from "express";
import {userModel} from '../models/user.models.js'

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

    const createUser = await userModel.create({
        name,
        email,
        password,
        role
    })

    return res.status(200).json({
        user: createUser
    })
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

router.route('/login').post((req, res) => {
    res.status(200).json({
        message: 'you have to login first.'
    })
})

export default router