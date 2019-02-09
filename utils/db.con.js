require("dotenv/config");
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
//connection
mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log("Error in DB connection:" + err);
    });