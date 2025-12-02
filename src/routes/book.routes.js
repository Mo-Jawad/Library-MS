import { Router } from "express";
import booksModel from '../models/book.models.js'
import authorizeRole from "../middleware/authrole.js";

const router = Router()


// fetch all books
router.route('/all-books').get(async (req, res) => {
    const allBooks = await booksModel.find()

    if(!allBooks) {
        return res.status(500).json({
            message: 'server error'
        })
    } else {
        return res.status(200).json({
            message: 'All books fetched successfully',
            book: allBooks
        })
    }
})

// fetch a single book
router.route('/:name').get(async (req, res) => {
    const { name } = req.params

    const realName = name.split('-').join(" ")


    const book = await booksModel.find({title: realName})



    if(!book) {
        return res.status(500).json({
            message: 'server error'
        })
    } else {
        return res.status(200).json({
            message: 'the book fetched successfully',
            book: book
        })
    }
})


// Adding a book after checking "ADMIN" as a role

router.route('/add-book').post(authorizeRole('admin'),async (req, res) => {
    const { title, author, publishedYear, genre, availableCopies } = req.body

    if (!title || !author || !publishedYear || !genre || !availableCopies) {
        return res.status(404).json({
            message: 'Fill up All the fields'
        })
    }



    const addBook = await booksModel.create({
        title,
        author,
        publishedYear,
        genre,
        availableCopies
    })



    if(!addBook) {
        return res.status(500).json({
            message: 'server error'
        })
    } else {
        return res.status(200).json({
            message: 'The book is added',
            book: addBook
        })
    }
})

export default router 