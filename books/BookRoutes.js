"use strict";
const BooksCtrl = require("./BookCtrl");
const router = require('express').Router();

router.get('/', BooksCtrl.books);
router.post('/save', BooksCtrl.save);
module.exports = router;