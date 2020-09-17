const express = require('express');

const app = express();

const Client = require('../../src/model/Client');

module.exports = async function ClientMiddleware(req, res, next) {
    console.log(req);
    next();
     
};