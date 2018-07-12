#! /usr/bin/env node

console.log('This script populates bots to your database. Specified database as argument - e.g.: node populate_bot_database mongodb://metadating:metadating2018@ds235181.mlab.com:35181/ibm_bots');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Bot_basic = require('./models/bot_basic')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var bots = []


function bot_basicCreate(name, description, image_path, workspace_id_token, username_token, password_token, cb) {
    bot_basicdetail = {
        name:name, 
        description:description, 
        image_path:image_path,
        workspace_id_token:workspace_id_token, 
        username_token:username_token,
        password_token:password_token,    
    }
    var bot_basic = new Bot_basic(bot_basicdetail); 

    bot_basic.save(function (err) {
        if (err) {
          cb(err, null)
          return
        }
        console.log('Neuer Bot: ' + bot_basic.name);
        bots.push(bot_basic)
        cb(null, bot_basic)
      }  );
}

function createBots(cb) {
    async.parallel([
        function(callback) {
            bot_basicCreate(
                'Heidi Klum',
                'description',
                'rachel_rationality',
                'fa73acd9-16d4-42cb-935f-d0b13a25395d',
                '0d5046eb-cdff-4aaf-812c-061f7d396d0d',
                'cIVuLdIRCO4s',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Lisa',
                'description',
                'rachel_rationality',
                '65719630-1501-4db2-95db-0448295faabf',
                'u54b3e159-42a3-439b-9829-db3ca57d3f47',
                'DRMhV1QoPcoY',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Ronny',
                'description',
                'rachel_rationality',
                '1b324ef6-ef3d-4d08-a06c-46372e5d2704',
                'fa7f6efe-38fc-4737-aebb-b315caa531b7',
                'Y8MBWDQZ6eNX',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Anna Koslova',
                'description',
                'rachel_rationality',
                'edbc1c7b-fd3a-4d78-b2d4-0ba1b7430924',
                '0a6e9f76-99cc-4f03-882f-8d41455b295b',
                '2GS8iKZ2Ycrc',
                callback
                );
          },  
          function(callback) {
            bot_basicCreate(
                'McMirco',
                'description',
                'rachel_rationality',
                '5d07c531-3021-4659-977b-07bc3ba208d7',
                '1a118377-3a40-4047-ae6a-8123e49b7a14',
                '4BUXVvz6TfcL',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'DepriSchri',
                'description',
                'rachel_rationality',
                '3d6f00ac-d03e-420f-8684-27b19f1a8f49',
                '0a710bfb-43d6-4222-b136-523719300138',
                '0RkX2wOkudS3',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Botilda',
                'description',
                'rachel_rationality',
                '104a6faf-f448-49e9-aeff-cd90f9f53637',
                'cf4fc36d-f378-4c96-bf5f-5e64b5925c4a',
                'sl5Z4iMCMBgN',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'ufo361',
                'description',
                'rachel_rationality',
                '40822cd7-c3c3-459e-a6e1-93367447ee91',
                'b30929f7-ac03-4a09-88e3-11280fcdbefa',
                'g3iv7VvqvgJX',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Zuckerberg',
                'description',
                'rachel_rationality',
                '9d36896e-ef74-4448-8945-d2d83a727a78',
                '51bf7895-89fc-472b-91c8-610764ad5c8b',
                'mlhsYkuuWDEF',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Bärbel',
                'description',
                'rachel_rationality',
                '6d09b318-ec00-461b-929c-feb250e0eaca',
                '4d4807fc-a562-4163-8b3f-f369e86c7519',
                'r15yAUygkZL4',
                callback
                );
          },                                   
    // optional callback
    ],
    cb);
}


async.series([
    createBots
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Tatam! Ready to rumble.');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
