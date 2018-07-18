
var watson = require('watson-developer-cloud');
var express = require('express');
var app = express();

var Bot_basic = require ('../models/bot_basic');
var User_sessions_informations = require ('../models/user_sessions_informations');

var people = {};
var namebot1 = {};
var namebot2 = {};
var bot_array = {};
//var bot_2 = {};
var botdata = {};

//login data var

var username1
var password1
var workspace_id1
var username2
var password2
var workspace_id2

var botLoginObjectArray

var bot_id_1
var bot_id_2

var clientSearch = {};
var botAuth1 = {}
var botAuth2 = {}

//for context updating 
var context_bot1
var context_bot1_update
var context_bot2
var context_bot2_update

//people[socket.id] = "aljosa";//names.nickname;
//username1 = names.username1;
//password1 = names.password1;
//workspace_id1 = names.workspace_id1;
//namebot1[socket.id] = "bot1";//names.namebot1;
//username2 = names.username2;
//password2 = names.password2;
//workspace_id2 = names.workspace_id2;
//namebot2[socket.id] = "bot2" //names.namebot2;

//escaping our json-strings (https://stackoverflow.com/questions/4253367/how-to-escape-a-json-string-containing-newline-characters-using-javascript#4253415)
String.prototype.escapeSpecialChars = function () {
    return this.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
};


function socket(io) {

    io.on('connection', function (socket) {

                // experimental
        var room = ('room_' + socket.id); // generate dynamic room name
        socket.join(room);

        bot_id_1 = (socket.id + '_bot1');
        bot_id_2 = (socket.id + '_bot2');

        console.log(socket.id + ' connected to room ' + room); //for debuging in console

        // experimental end


        console.log('a user connected lala');
        socket.on('new message', function (msg) {
            var data = {
                message: msg.message,
                username: msg.username,
                data: Date.now()
            };

            io.emit('chat message', data);
        });


        socket.on('disconnect', function () {
            console.log('user disconnected');
            delete bot_array[bot_id_1];
            console.log("bot_1 deleted");
            delete bot_array[bot_id_2];
            console.log("bot_2 deleted");
        });

        socket.on("set_name", function (data) {
            names = JSON.parse(data);
            people[socket.id] = names.nickname;
            username1 = names.username1;
            password1 = names.password1;
            workspace_id1 = names.workspace_id1;
            namebot1[socket.id] = names.namebot1;
            username2 = names.username2;
            password2 = names.password2;
            workspace_id2 = names.workspace_id2;
            namebot2[socket.id] = names.namebot2;


            console.log('chosen nick: ' + people[socket.id]);

            socket.emit('name_set', people[socket.id]);

        });

        socket.on('message', async function (message) {
            message = JSON.parse(message);

            console.log("message_json_esc: parse " + message.userId);

            async function getClientInfo() {
                clientSearch = await User_sessions_informations.findOne({ 'user_id': message.userId },).exec();                
                console.log("getClientInfo function gives" + clientSearch);
            }

            async function getBot1Auth() {
                botAuth1 = await Bot_basic.findOne({ 'name': clientSearch.bot1 },).exec();
                console.log("getBot1Auth function gives: " + botAuth1);
            }

            async function getBot2Auth() {
                botAuth2 = await Bot_basic.findOne({ 'name': clientSearch.bot2 },).exec();
                console.log("getBot2Auth function gives: " + botAuth2);
            }
             
            await getClientInfo();
            await getBot1Auth();
            await getBot2Auth();        

            console.log("what happend first?");
            bot_array[bot_id_1] = new watson.AssistantV1({
                username: botAuth1.username_token, //"0d5046eb-cdff-4aaf-812c-061f7d396d0d", //username1,
                password: botAuth1.password_token,//"cIVuLdIRCO4s", //password1, 
                version: '2018-02-16'
            });

            //Watson deklarierung bot
            console.log("credentials for " + botAuth2.name + " are " + botAuth2.username_token)
            bot_array[bot_id_2] = new watson.AssistantV1({
                username: botAuth2.username_token,//"54b3e159-42a3-439b-9829-db3ca57d3f47", //username2,
                password: botAuth2.password_token,//"DRMhV1QoPcoY",//password2,
                version: '2018-02-16'
            });

            console.log("what is the bot1 token?" + botAuth1.workspace_id_token);

            var message_json = JSON.stringify(message);
            var message_json_esc = message_json.escapeSpecialChars();

            socket.emit('message', people[socket.id], message_json_esc); // send to client
            socket.to(room).emit('message', people[socket.id], message_json_esc); // send to room

            console.log("message_json_esc: " + message_json_esc);


            bot_array[bot_id_1].message({
                workspace_id: botAuth1.workspace_id_token, //"fa73acd9-16d4-42cb-935f-d0b13a25395d", //workspace_id1,
                context: context_bot1_update,
                input: { 'text': JSON.stringify(message.content) }

            }, function (err, response) {
                if (err)
                    console.log('error:', err);
                else
                    //console.log(JSON.stringify(response, null, 2));
                    //console.log(JSON.stringify(response.output.text))
                    //console.log(typeof JSON.stringify(response.output.text))
                    botdata = {
                        content: response.output.text,
                        type: 'botAnswer',
                        botPhoto: botAuth1.image_path
                    }
                //console.log("erster versuch: " + botdata.content)
                //console.log("Ist das der context?: " + JSON.stringify(botdata.context))

                var botdata_json = JSON.stringify(botdata);
                var botdata_json_esc = botdata_json.escapeSpecialChars();

                console.log("wann kommt man hier hin? Und funktioniert das? ")
                

                socket.emit('message', botAuth1.name, botdata_json_esc); // let bot respond in client
                socket.to(room).emit('message', botAuth1.name, botdata_json_esc); // let bot respond to room

                //console.log(botdata.content)
            });
        });



        socket.on("callSecondBot", function (data) {
            console.log("bin ich bei callseondbot?")
            message = JSON.parse(data);

            context_bot2_update = context_bot2
            console.log(context_bot2_update)

            bot_array[bot_id_2].message({
                workspace_id: botAuth2.workspace_id_token, //"65719630-1501-4db2-95db-0448295faabf", //workspace_id2, //workspace_id2,
                context: context_bot2_update,
                input: { 'text': JSON.stringify(message.content) }

            }, function (err, response) {
                if (err)
                    console.log('error:', err);
                else
                    //console.log(JSON.stringify(response, null, 2));
                    botdata = {
                        content: response.output.text,
                        type: "botAnswer2",
                        botPhoto: botAuth2.image_path
                    }
                context_bot2 = response.context;
                var botdata_json = JSON.stringify(botdata);
                var botdata_json_esc = botdata_json.escapeSpecialChars();

                socket.emit('message', botAuth2.name, botdata_json_esc); // let bot respond
                socket.to(room).emit('message', botAuth2.name, botdata_json_esc); // let bot respond
            });
        });

        socket.on("callFirstBot", function (data) {
            console.log("bin ich bei callFirstBot?")

            message = JSON.parse(data);

            context_bot1_update = context_bot1;
            console.log(context_bot1_update)

            bot_array[bot_id_1].message({
                workspace_id: botAuth1.workspace_id_token, //"fa73acd9-16d4-42cb-935f-d0b13a25395d", //workspace_id1,
                context: context_bot1_update,
                input: { 'text': JSON.stringify(message.content) }

            }, function (err, response) {
                if (err)
                    console.log('error:', err);
                else
                    //console.log(JSON.stringify(response, null, 2));
                    botdata = {
                        content: response.output.text,
                        type: "botAnswer",
                        botPhoto: botAuth1.image_path
                    }

                context_bot1 = response.context;

                var botdata_json = JSON.stringify(botdata);
                var botdata_json_esc = botdata_json.escapeSpecialChars();

                socket.emit('message', botAuth1.name, botdata_json_esc); // let bot respond
                socket.to(room).emit('message', botAuth1.name, botdata_json_esc); // let bot respond
            });
        })


    });
};

module.exports = socket;

//p.text-center= title