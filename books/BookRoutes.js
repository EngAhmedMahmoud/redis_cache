"use strict";
const BooksCtrl = require("./BookCtrl");
const router = require('express').Router();

router.get('/', BooksCtrl.books);
module.exports = router;