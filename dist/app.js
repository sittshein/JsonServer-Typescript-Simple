"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var request = require("request");
var app = express();
var router = express.Router();
router.get('/', function (req, res) {
    res.json({
        message: 'Hi there, welcome to My Api'
    });
});
router.get('/properties', function (req, res, next) {
    var proxy = 'http://localhost:3000/properties';
    var options = { json: true };
    request
        .get(proxy, options)
        .on('error', function (err) {
        console.error('api request failed:', err);
        next(err.message);
    })
        .pipe(res);
});
app.use('/api', router);
var port = process.env.PORT || 9000;
var httpServer = http.createServer(app);
httpServer.listen(port, function (err) {
    if (err) {
        console.error(err);
    }
    console.log("App is running on http://localhost: %d", port);
});
