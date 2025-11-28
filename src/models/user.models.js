import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: [8, 'Password must be at least 8 characters long'],
        required: true
    },
    role: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  borrowedBooks: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }
  ]
}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)

export {userModel}