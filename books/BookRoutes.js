"use strict";
const BooksCtrl = require("./BookCtrl");
const router = require('express').Router();

router.get('/', BooksCtrl.books);
router.post('/', BooksCtrl.save);
router.delete('/book/:id', BooksCtrl.delete);
module.exports = router;