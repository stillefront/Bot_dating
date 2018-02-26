var Bot_basic = require ('../models/bot_basic');

var async = require('async');

//display all bots
exports.index = function(req, res, next) {  
        Bot_basic.find({}, 'name description')
        .exec(function (err, list_bots) {
            if (err) { return next(err); }
            res.render('bot_welcome', { title: 'Bots', bots_list: list_bots});
        });
};

//display all bots 

