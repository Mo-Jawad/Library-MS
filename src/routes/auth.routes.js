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

    await createUser.save()

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

    if(theUser.password !== password) {
        return res.status(404).json({
        message: 'something went wrong!'
    })
    }

    return res.status(200).json({
        message: 'you loggedin successfully',
        user: theUser
    })
    } catch (error) {
        return res.status(500).json({
        message: 'something went wrong'
    })
    }
    
})

export default router