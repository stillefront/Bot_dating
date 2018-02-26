var Bot_basic = require ('../models/bot_basic');

var async = require('async');
var bodyParser = require("body-parser");

exports.index = function(req, res, next) { 
        console.log("are we here?");
        res.send("this will be the chat ");
};