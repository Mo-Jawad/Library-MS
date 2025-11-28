import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})

export const connection = () => { 
    mongoose.connect(process.env.MONGODB_KEY)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => {
            console.error('MongoDB connection error:', err)
            process.exit(1)
  })
}
