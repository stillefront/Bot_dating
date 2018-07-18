var Bot_basic = require ('../models/bot_basic');

var async = require('async');

//display all bots
exports.index = function(req, res, next) {  
        Bot_basic.find({}, 'name description image_path')
        .exec(function (err, list_bots) {
            if (err) { return next(err); }
            res.render('bot_welcome', { title: 'meta.dating 2018: BOTIFY!', bots_list: list_bots});
        });
};

//display all bots 


