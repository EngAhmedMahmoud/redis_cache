"use strict";
const Book = require("./BookModel");

//all books
exports.books = (req, res, next) => {
    Book.find()
        .then((books) => {
            if (books.length != 0) {
                return res.status(200).json({
                    success: 1,
                    books: books
                });
            } else {
                return res.status(200).json({
                    success: 0
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                error: err
            });
        })

}
//save book
exports.save = (req, res, next) => {
    let newBook = new Book(req.body);
    newBook.save()
        .then((book) => {
            res.status(201).json({ success: 1, book });
        })
        .catch((err) => {
            if (err && err.errors) {
                var errors = err.errors;
            } else {
                var errors = err;
            }
            res.status(500).json({ success: 0, errors });
        })
}
//delete book
exports.delete = (req, res, next) => {
    let bookId = req.params.id;
    Book.findByIdAndDelete(bookId)
        .then((deleted) => {
            if (deleted) {
                res.status(200).json({
                    success: 1,
                    book: deleted
                });
            } else {
                res.status(200).json({
                    success: 1,
                    book: "Book Not Exist"
                });
            }

        })
        .catch((error) => {
            res.status(500).json({
                success: 0,
                error: error
            });
        })
}
//edit book
exports.edit = (req, res, next) => {
    let bookId = req.params.id;
    Book.findByIdAndUpdate(bookId, req.body, { new: true })
        .then((book) => {
            if (book) {
                res.status(200).json({
                    success: 1,
                    book: book
                });
            } else {
                res.status(200).json({
                    success: 1,
                    book: "Book Does not exist"
                });
            }

        })
        .catch((error) => {
            res.status(200).json({
                success: 0
            });
        })
}
//show book
exports.show = (req, res, next) => {

}