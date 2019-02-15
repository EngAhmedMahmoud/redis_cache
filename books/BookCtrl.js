"use strict";
const Book = require("./BookModel");
const redis = require("./../utils/redis.con");
const redisClient = redis.redisClient;
//all books
exports.books = (req, res, next) => {
    //check if cache does not have data 
    redisClient.get("books", (error, books) => {
        if (error) {
            console.log(error);
        }
        if (books) {
            let cachedBooks = JSON.parse(books);
            let response = {
                success: 1,
                books: cachedBooks
            };
            res.status(200).json(response);
        } else {
            Book.find()
                .then((books) => {
                    let cachedBooks = JSON.stringify(books);
                    redisClient.set("books", cachedBooks)
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
    });

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
            //01- get all books stored in cache first
            redisClient.get("books", (error, books) => {
                if (error) {
                    console.log(error);
                }
                if (books) {
                    let parsedBooks = JSON.parse(books);
                    //02 -searching for edited book and get its index
                    let matchedBook = parsedBooks.find(book => book._id == bookId);
                    //03 -get index of matched book into array to replace it with new value
                    let bookIndex = parsedBooks.indexOf(matchedBook);
                    //04 -replace with update book to update cache
                    parsedBooks[bookIndex] = book;
                    //05 -save books in cache again
                    redisClient.set("books", JSON.stringify(parsedBooks));
                }
            })
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
    let bookId = req.params.id;
    redisClient.get("books", (error, books) => {
        if (error) {
            console.log(error);
        }
        if (books) {
            let parsedBooks = JSON.parse(books);
            let book = parsedBooks.find(book => book._id === bookId);
            if (book) {
                res.status(200).json({
                    success: 1,
                    book: book
                });
            } else {
                res.status(404).json({
                    success: 0,
                    book: "Book Not exist"
                });
            }
        } else {
            Book.findById(bookId)
                .then((book) => {
                    res.status(200).json({
                        success: 1,
                        book: book
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        success: 0,
                        error: error
                    });
                })
        }
    });

}