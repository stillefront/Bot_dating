var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

// Require controller modules.

var bot_controller = require('../controllers/botController');
var chat_start = require('../controllers/chatStart');

/// Routes ///


// GET select bots "bot_welcome.pug"
router.get('/', bot_controller.index)

// GET chat app
router.get('/chat', chat_start.index) 


router.post('/chat', function (req, res) {
  var bot1 = req.body.bot1;
  var bot2 = req.body.bot2
  console.log("Der name der ausgewählten bots ist " + bot1 + " und " + bot2);
})

  


module.exports = router;