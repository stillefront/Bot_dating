var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

// Require controller modules.

var bot_controller = require('../controllers/botController');
var chat_start = require('../controllers/chatStart');
var chat_start_onebot = require('../controllers/chatStart_onebot');

/// Routes ///


// GET select bots "bot_welcome.pug"
router.get('/', bot_controller.index)

// GET chat app
router.get('/chat', chat_start.index) 

router.get('/chat_onebot', chat_start_onebot.index) 

//route the POST information to the search query to search for the tokens of selected bots
router.post('/chat', chat_start.searchForBothToken)

router.post('/chat_onebot', chat_start_onebot.searchForBothToken)


module.exports = router;
