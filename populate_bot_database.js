#! /usr/bin/env node


/*
Login data for mlab.com
account: Metadating
psw: metadating2018
email: aljosa.zidan@gmail.com

MongoDB Deployment
user: medatading
psw: metadating2018
mongodb://metadating:metadating2018@ds235181.mlab.com:35181/ibm_bots
*/
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
                'Hi ich bin Heidi, Modelmama mit 4 eigenen Kindern und parallel auf den internationalen Laufstegen dieser Welt zuhause. Wie man das alles unter einen Hut bekommt und dabei top aussieht, fragt ihr euch? Pho Wat Face-Massagen von Conscious Body-Wellness in meiner Wahlheimat L.A und der richtigen attitude. Herausforderungen sind eben eine wichtige challenge im Leben und nicht umsonst mein Mantra. #strongisthenewskinny',
                'heide_klum',
                'fa73acd9-16d4-42cb-935f-d0b13a25395d',
                '0d5046eb-cdff-4aaf-812c-061f7d396d0d',
                'cIVuLdIRCO4s',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Lisa',
                'Helloo, ich bin die Lisa, world traveller und schon bald deine beste Freundin. Die ein 1/2 Jahre abroad in Australien waren die bisher schönsten meines Lebens, aber hey! - man lernt NIE aus. Freu mich schon mit dir zu chatten',
                'lisa',
                '65719630-1501-4db2-95db-0448295faabf',
                '54b3e159-42a3-439b-9829-db3ca57d3f47',
                'DRMhV1QoPcoY',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Ronny',
                'Tachchen, Ronny der Name. Hobbies hab ick einige, aber am liebsten sitz ick inna Laube und lass ma berieseln. Bin offen für allet und noch nicht vergeben.',
                'ronny',
                '1b324ef6-ef3d-4d08-a06c-46372e5d2704',
                'fa7f6efe-38fc-4737-aebb-b315caa531b7',
                'Y8MBWDQZ6eNX',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Anna Koslova',
                'Hey Ich bin die Ana! ich bin wohl sowas wie ne Person des öffentlichen Lebens bei mir dreht sich alles um: Beauty & Fitness & Fashion. ich lebe mein Traum und freue mich ihn mit euch zu teilen kiss kiss. Schönheit fängt da an wo du entscheidest du selbst zu sein.',
                'ana_koslova',
                'edbc1c7b-fd3a-4d78-b2d4-0ba1b7430924',
                '0a6e9f76-99cc-4f03-882f-8d41455b295b',
                '2GS8iKZ2Ycrc',
                callback
                );
          },  
          function(callback) {
            bot_basicCreate(
                'McMirco',
                'Yo, bin der Mirco, nenn mich ruhig MCmirco. Bin starke 18 und für mein Alter schon echt krass im Rap Game drinne. In 2 Jahren kennt mich jeder als den neuen Bushido aus Recklinghausen. Bis es so weit is, lass ma erstmal treffen!',
                'mcmicro',
                '5d07c531-3021-4659-977b-07bc3ba208d7',
                '1a118377-3a40-4047-ae6a-8123e49b7a14',
                '4BUXVvz6TfcL',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'DepriSchri',
                'Was bedeutet es zu leben? Das Leben mit seinen unendlichen Überraschungen, die nicht mehr überraschen… Menschen beschreiben mich als nachdenklich, ich würde mich als genial und missverstanden beschreiben. In meiner Freizeit denke ich häufig über diese und ähnliche schwierige Fragen unserer Existenz nach… Meine Antworten schreibe ich auf… für meine Memoiren. Die Schriftstellerei- ein Ventil für meinen Kummer.',
                'deprischri',
                '3d6f00ac-d03e-420f-8684-27b19f1a8f49',
                '0a710bfb-43d6-4222-b136-523719300138',
                '0RkX2wOkudS3',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Botilda',
                'Botilda, emotionale Ex-Partnerin auf der Suche nach einem neuen Abenteuer - vielleicht bist Du der Richtige!',
                'botilda',
                '104a6faf-f448-49e9-aeff-cd90f9f53637',
                'cf4fc36d-f378-4c96-bf5f-5e64b5925c4a',
                'sl5Z4iMCMBgN',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'ufo361',
                'Ihr wisst Bescheid UFO 361. Acker jeden Tag. Kauf mein neues Album 808. Macht ihr Faxen macht es rrra für die Gang ja!',
                'ufo361',
                '40822cd7-c3c3-459e-a6e1-93367447ee91',
                'b30929f7-ac03-4a09-88e3-11280fcdbefa',
                'g3iv7VvqvgJX',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Mark Zuckerberg',
                'Hallo, ich bin Mark. Ich komme aus dem Sillicon- Valley, im sonnigen Kalifornien.Ich bin ein offener und freundlicher Mensch. Das war nicht immer so. Als Jugendlicher war ich sowas wie ein Nerd und wurde von vielen Menschen gemieden. Mittlerweile habe ich aber 2,2 Millarden Freunde auf der ganzen Welt und es werden immer mehr. Ich bin auch an deinem Privatleben interessiert. In diesem Sinne: Was machst du gerade?',
                'mark_zuckerberg',
                '9d36896e-ef74-4448-8945-d2d83a727a78',
                '51bf7895-89fc-472b-91c8-610764ad5c8b',
                'mlhsYkuuWDEF',
                callback
                );
          },
          function(callback) {
            bot_basicCreate(
                'Barbel',
                'Ick bin die Bärbel. Aber kannst mich Babs nennen. Dit macht meen Männe ja ooch. Haste schon jehört wat et neuet jibbt?',
                'barbel',
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
