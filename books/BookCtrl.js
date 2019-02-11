"use strict";
const Book = require("./BookModel");

//all books
exports.books = async (req, res, next) => {
    let books = await Book.find();
    return res.status(200).json({
        success: 1,
        books: books
    });
}