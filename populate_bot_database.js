#! /usr/bin/env node

console.log('This script populates bots to your database. Specified database as argument - e.g.: node populate_bot_database mongodb://your_username:your_password@your_dabase_url');

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


function bot_basicCreate(name, description, image_path, auth_token, dev_token, date_created, cb) {
    bot_basicdetail = {
        name:name, 
        description:description, 
        image_path:image_path, 
        auth_token:auth_token,
        dev_token:dev_token,
        date_created:date_created       
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
                'Victoria Bach',
                'Medizinstudentin / film-lover / Wanderlust / Kick-Boxing / Berlin, 25, 170 groß und abenteuerlustig',
                './public/images/bot_profile_picture/victoria_bach',
                '78ae1fec4ace101bf37f56a82788ec53',
                'dev_token_test1',
                '2018-02-15',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Ralf Rosenthal',
                '32, Bernau, leidenschaftlicher Fachmann für Orthopädische Fußeinlagen, 180cm groß & offen für alles und schöne Füße ;-)',
                './public/images/bot_profile_picture/ralf_rosenthal',
                '64928745850c378383b8db61a027150b',
                'dev_token_test2',
                '2018-02-15',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Bob',
                'Bob ist ein junger, aufstrebender und nerdiger Charakter. Er hat auf der beruflichen Seite sehr viel Erfolg - leider sieht es im Liebesleben ganz anders aus...',
                './public/images/bot_profile_picture/bob',
                'c7d5a99817fc526df4443168538f6e56',
                'dev_token_test2',
                '2018-02-15',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Alice von Wunderland ',
                'Alice (35 Jahre) ist eine erfolgreiche, selbstbewusste Geschäftsfrau und nach vielen unglücklichen Affären nun auf der Suche nach einem geeigneten Vater für ihr Wunschkind.',
                './public/images/bot_profile_picture/alice_von_wunderland',
                '3ec0d3d5c506330678f855d8db5d2037',
                'dev_token_test2',
                '2018-02-15',
                callback
                );
          },  
          function(callback) {
            bot_basicCreate(
                'Patricia Bait',
                '30 Jahre alt, männlich verheiratet aber zur Zeit unglücklich . Einzelkind, hat einen guten Draht zu seinen Eltern. Wohnt mit seiner Frau zusammen in einer verglasten Villa, hat viele Designermöbel, exklusive, stylische Einrichtung. sehr reich. sammelt exotische, ausgestopfte Tiere',
                './public/images/bot_profile_picture/patricia_bait',
                '31db0dac0d11964234072eda86449c23',
                'dev_token_test2',
                '2018-02-15',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Patrick Bateman',
                'Patrick Bateman (30) ist sehr erfolgreich und steinreich. Er ist verheiratet, aber unglücklich. Die Liebe ist leider verwelkt. Er wohnt mit seiner Frau in einer verglasten, exklusiven Villa. Er sammelt exotische, ausgestopfte Tiere, von denen er die meisten selbst erlegt hat.',
                './public/images/bot_profile_picture/patrick_bateman',
                'b57305b1f5c2cb1f7027a298e3a63f0d',
                'dev_token_test2',
                '2018-02-15',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'David Dream',
                'Sehr offen und gesellig, neugierig, fantasievoll, unabhängig von Urteilen anderer, unkonventionell. Gerne gesellig und unter Leuten. Unterhält sich gerne und geht auf lustige Diskussionen ein. Freut sich neue Menschen kennenzulernen. Sucht nach der wahren Liebe.',
                './public/images/bot_profile_picture/david_dream',
                '56e125353144e848713e498b73f0c3b9',
                'dev_token_test2',
                '2018-02-15',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Rachel Rationality',
                'Rachel Rationality, 22 Jahre, geboren in München, aktuell wohnhaft in Berlin. Studium der Wirtschaftsinformatik, Bachelor abgeschlossen. Sportlich aktiv, am liebsten Tennis. Politisch, wissenschaftlich, kulturell interessiert.',
                './public/images/bot_profile_picture/rachel_rationality',
                '9286815612a1ecb98de6077982e2ef12',
                'dev_token_test2',
                '2018-02-15',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Kim',
                'Ich bin Kim 24 Jahre aus B - Lichtenberg, Girls meldet euch',
                './public/images/bot_profile_picture/kim',
                '7ce59919b150111e38d7733164811bae',
                'dev_token_test2',
                '2018-02-15',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Charlie',
                'Ich heiße Charlie Meier und bin 22 Jahre alt. Ich wohne derzeit in Berlin und studiere Grundschullehramt, bin aber in Sauen groß geworden (gemütlicher Ort in Brandenburg). Mein liebstes Hobby ist Nail Art, ich habe einen YouTube Channel. Ich bin Single und warte noch auf den Traumprinzen ;)',
                './public/images/bot_profile_picture/charlie',
                'c9183f20ef965f07e82c05b5a6157428',
                'dev_token_test2',
                '2018-02-15',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Habibo',
                'Ich heiße Charlie Meier und bin 22 Jahre alt. Ich wohne derzeit in Berlin und studiere Grundschullehramt, bin aber in Sauen groß geworden (gemütlicher Ort in Brandenburg). Mein liebstes Hobby ist Nail Art, ich habe einen YouTube Channel. Ich bin Single und warte noch auf den Traumprinzen ;)',
                './public/images/bot_profile_picture',
                '035c15705d5a22f4ed49b32092ffdbe9',
                'dev_token_test2',
                '2018-02-15',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Glyphost-Gabi',
                'description_lalala2',
                './public/images/bot_profile_picture',
                '535007d74377e1f9e98b6c3ebd5405b6',
                'dev_token_test2',
                '2018-02-15',
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
