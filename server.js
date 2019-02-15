"use strict";
require("dotenv/config");
const express = require('express');
const bodyParser = require("body-parser");
const booksRouter = require('./books/BookRoutes');
const redis = require("./utils/redis.con");
const app = express();
//DB Connection
require("./utils/db.con");
//Redis connection
redis.redisConnection();

const SERVER_IP = process.env.SERVER_IP;
const SERVER_PORT = process.env.SERVER_PORT;
//init app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//books router
app.use('/books', booksRouter);
//handle any http error
app.use((req, res, next) => {
    return res.status(404).json({
        error: req.url + " Not Found"
    });
});

//run server
app.listen(SERVER_PORT, () => {
    console.log(`Server started ${SERVER_IP}:${SERVER_PORT}`);
});