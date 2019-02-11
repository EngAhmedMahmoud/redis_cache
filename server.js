"use strict";
require("dotenv/config");
const express = require('express');
const bodyParser = require("body-parser");
const booksRouter = require('./books/BookRoutes');
const app = express();
//DB Connection
require("./utils/db.con");
const SERVER_IP = process.env.SERVER_IP;
const SERVER_PORT = process.env.SERVER_PORT;
require("./books/BookRoutes")
//init app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//books router
app.use('/books', booksRouter);
//handle any http error
app.use((req, res, next) => {
    let error = new Error;
    return next(error);
});
app.use((error, req, res, next) => {
    if (error) {
        error.message = "Not found";
        error.code = 500;
        return res.json(error);
    } else {
        return next();
    }
})
//run server
app.listen(SERVER_PORT, () => {
    console.log(`Server started ${SERVER_IP}:${SERVER_PORT}`);
});