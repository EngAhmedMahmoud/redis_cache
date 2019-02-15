"use strict";
const redis = require("redis");
const redisClient = redis.createClient();
exports.redisClient = redisClient;
//create connection
exports.redisConnection = () => {
    redisClient.on("connect", () => {
        console.log("Redis Connected Successfully");
    });
    redisClient.on("error", (error) => {
        console.log(`Error in redis!! ${error}`);
    });
}