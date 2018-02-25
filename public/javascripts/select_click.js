
var counter = 0;
var bot_array =[0,0];

$( document ).ready(function() {
  console.log( "ready!" );

  $( ".klick" ).on("click", function() {
    counter = counter + 1;
    if (counter == 1) {      
      $(this).toggleClass('clicked');
      bot_array[0] = $(this).children('h5').text();
      console.log("click 1:" + counter)
      console.log(bot_array);
    }
    if (counter == 2) {      
      $(this).toggleClass('clicked');
      bot_array[1] = $(this).children('h5').text();
      console.log("click 2;" + counter)
      console.log(bot_array);
      $( ".chat-start h1" ).replaceWith( "<h1>Chat Now!</h1>" );

    }
    if (counter > 2 ) {
      $('.klick').removeClass('clicked');
      $( ".chat-start h1" ).replaceWith( "<h1>Chat Now!</h1>" );
      bot_array = [0,0];
      counter = 0;
      console.log(counter);
      console.log(bot_array);
    }
  }); 

  $(".chat-start" ).on("click", function() {
    if(counter == 2) {
    console.log("Send Bot information to the server!");
    $.post( "/bot/chat", { bot1: bot_array[0], bot2: bot_array[1] } );
    window.location.href = "/bot/chat";

    }
    else {
      console.log("not working!");
    }
  });
});