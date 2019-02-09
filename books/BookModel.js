"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;
//book schema
const book = new schema({
    author: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Book', book, "books");