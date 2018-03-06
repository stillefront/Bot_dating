var express = require('express');
var app = express();

var Bot_basic = require ('../models/bot_basic');

var async = require('async');
var bodyParser = require("body-parser");

//implement the chat here
exports.index = function(req, res, next) { 
        //res.send("Hier wird der chat zwisschen " + app.locals.bot1 + " und " + app.locals.bot2 + " stattfinden.");
        res.render("chat_onebot", {title: "Hier wird der chat mit " + app.locals.bot1 + " stattfinden."})
};

//search fot the selected bots in the database 
exports.searchForBothToken = function (req, res, next) {
        app.locals.bot1 = req.body.bot1;

        //search for the Token from bot1
        Bot_basic.findOne({ 'name': app.locals.bot1 }, 'name auth_token', function (err, bot_1) {
                if (err) return handleError(err);
                console.log("Der Token von " + bot_1.name + " ist " + bot_1.auth_token);
              });
  
}