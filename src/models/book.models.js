import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
    },
    genre: {
        type: String,
        required: true
    },
    availableCopies: {
        type: Number,
        required: true
    },
    borrowedUser: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    }, {
        timestamps: true
    })

module.exports = mongoose.model('Book', bookSchema)