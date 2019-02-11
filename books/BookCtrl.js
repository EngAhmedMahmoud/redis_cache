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
    let title = req.body.title;
    let author = req.body.author;
    let content = req.body.content;
    let newBook = new Book({
        title: title,
        author: author,
        content: content
    });
    newBook.save()
        .then((book) => {
            res.status(200).json({ success: 1, book });
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

}
//edit book
exports.edit = (req, res, next) => {

}
//show book
exports.show = (req, res, next) => {

}