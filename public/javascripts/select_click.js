$( document ).ready(function() {
  console.log( "ready!" );

var counter = 0;
var bot_array =[0,0];
window.socketBot1


// if you click on bots
  $( ".klick" ).on("click", function() {

    //count clicks
    counter += 1;
    
    if (counter == 1) {   
      
      //change color on clicked bot
      $(this).toggleClass('clicked');

      //save bot name to the array
      bot_array[0] = $(this).children('h5').text();

      $( ".chat-start h1" ).replaceWith( "<h1>Chat Now with a Bot!</h1>" );
      console.log(bot_array);
    }

    //counter 
    if (counter == 2) {      

      //change color on clicked bot
      $(this).toggleClass('clicked');

      //save bot name to the bot_array
      bot_array[1] = $(this).children('h5').text();
      console.log(bot_array);

      ////change "suche bots to chat now"
      $( ".chat-start h1" ).replaceWith( "<h1>Chat Bots!</h1>" );

    }
    //if more than two clicks happen
    if (counter > 2 ) {
      //change color on selected bots back to start color
      $('.klick').removeClass('clicked');

      //change "chat now" back to >Bitte Wähle zwei Bots aus:
      $( ".chat-start h1" ).replaceWith( "<h1>Bitte Wähle  ein oder zwei Bots aus:</h1>" );

      //reset bot_array & counter
      bot_array = [0,0];
      counter = 0;
      console.log(bot_array);
    }
  }); 
  //if two clicks happpen, than you can click on the Chat button
  $(".chat-start" ).on("click", function() {
    if (counter == 1) {
      console.log("Send Bot information to the server and start the chat betwen me and a Bot!");  
      $.post( "/bot/chat_onebot", { bot1: bot_array[0]});
      window.location.href = "/bot/chat_onebot";
      socketBot1 = bot_array[0]
    }

    if (counter == 2) {
    console.log("Send Bot information to the server and start chat between two Bots!");
    $.post( "/bot/chat", { bot1: bot_array[0], bot2: bot_array[1] } );
    window.location.href = "/bot/chat";
    socketBot1 = bot_array[0]
    }
    else {
      console.log("not working!");
    }
  });
});