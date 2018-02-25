var Bot_basic = require ('../models/bot_basic');

var async = require('async');

exports.index = function(req, res, next) {  
        console.log("are we here?")
        res.render('chat', { title: 'Bots', bots_list: list_bots});
};