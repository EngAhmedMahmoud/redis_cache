"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;
//book schema
const book = new schema({
    author: {
        type: String,
        required: ["Please Enter Author Name"],

    },
    title: {
        type: String,
        required: true,
        unique: ["Title is required"]
    },
    content: {
        type: String,
        required: ["Book content is require"]
    }
});
module.exports = mongoose.model('Book', book, "books");