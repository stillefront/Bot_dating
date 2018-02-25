var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

// Require controller modules.

var bot_controller = require('../controllers/botController');
var chat_start = require('../controllers/chatStart');

/// Routes ///

// GET catalog home page.
//router.get('/', function(req, res, next) {
 //   res.render('bot_welcome');
//});


// GET select bots "bot_welcome.pug"
router.get('/', bot_controller.index)

// GET chat app
router.get('/chat', function (req, res) {
    res.send("this will be the chat ");
  })

  router.post('/chat', function (req, res) {
    var bot1=req.body.bot1;
    var bot2 = req.body.bot2
    console.log("Der name der ausgewählten bots ist " + bot1 + " und " + bot2);
  })

  


module.exports = router;