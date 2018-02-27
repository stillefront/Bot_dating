var Bot_basic = require ('../models/bot_basic');

var async = require('async');
var bodyParser = require("body-parser");

//implement the chat here
exports.index = function(req, res, next) { 
        res.send("this will be the chat");
};

//search fot the selected bots in the database 
exports.searchForBothToken = function (req, res, next) {
        var bot1 = req.body.bot1;
        var bot2 = req.body.bot2

        //search for the Token from bot1
        Bot_basic.findOne({ 'name': bot1 }, 'name auth_token', function (err, bot_1) {
                if (err) return handleError(err);
                console.log("Der Token von " + bot_1.name + " ist " + bot_1.auth_token);
              });
        //search for the Token from bot2
        Bot_basic.findOne({ 'name': bot2 }, 'name auth_token', function (err, bot_2) {
                if (err) return handleError(err);
                console.log("Der Token von " + bot_2.name + " ist " + bot_2.auth_token);
              });      
}