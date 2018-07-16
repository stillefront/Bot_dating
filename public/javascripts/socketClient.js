$(document).ready(function(){

    //This our the functions that the chat uses
    
    //this is the structure for every msg from the bot
    function msgStructure(botClass, botName, botMsgContent, botPicturePath) {
        let msgStructure =  
            '<div class="' + botClass + '-msg">' + 
                '<p class="' + botClass + '-msg-name">' + botName + '</p>' +
                '<div class="' + botClass + '-msg-chat-box">' + 
                    '<p class="' + botClass + '-msg-text">' + botMsgContent + '</p>' +
                '</div>' +
                '<img class="' + botClass + '-msg-profilepicture" src="' + botPicturePath + '">' + 
            '</div>';
        return msgStructure   
    };
    
    // This is a fake msg that shows the "is typing" chat box
    function msgStructureIsTyping(botClass, botName, botPicturePath ) {
        let msgStructureIsTyping =  
            '<div class="' + botClass + '-is-typing-msg">' + 
                '<p class="' + botClass + '-msg-name">' + botName + '</p>' +
                '<div class="' + botClass + '-msg-chat-box">' + 
                    '<div id="lottie"></div>' +
                '</div>' +
                '<img class="' + botClass + '-msg-profilepicture" src="' + botPicturePath + '">' + 
            '</div>';
        return msgStructureIsTyping   
    };
    
    // this calculates the time that the Bot needs to write a msg 
    function msgSizeTimer(msgContent) {
        let awrageCharactersPerMinute = 750; // http://typefastnow.com/average-typing-speed
        let typingTime = Math.floor((JSON.stringify(msgContent).length * 1000) / (awrageCharactersPerMinute/60)); 
        return typingTime
    };
    
    // just a simple animation for the Is typing chat box. You can set the speed here
    function lottieAnimation() {
        var lottieElement = document.getElementById("lottie");
        lottie.loadAnimation({
            container: lottieElement, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/lottie-animation/data.json' // the path to the animation json
          });
    
        lottie.setSpeed(3); 
    }
    //scrolling function
    var smoothscroll = function(){
        $('#messages').stop().animate({
              scrollTop: $('#messages')[0].scrollHeight
        }, 800);
    };
    
    //this is the function that fakes the whole "is typing" thing happen.
    function fakeItTillYouMakeIt (botClass, botName, botMsgContent, botPicturePath, SocketEmitPath, data) {
        setTimeout(function() { 
            $('#messages').append(msgStructureIsTyping(botClass, botName, botPicturePath));
            lottieAnimation();
            smoothscroll();
            
            if ( Math.floor((Math.random() * 100) + 1) > 50) {
                setTimeout(function(){
                    $("." + botClass + "-is-typing-msg").remove();	
                    smoothscroll();
    
                    setTimeout(function(){
                        $('#messages').append(msgStructureIsTyping(botClass, botName, botPicturePath));
                        lottieAnimation();
                        smoothscroll();
    
                        setTimeout(function(){
                            $("." + botClass + "-is-typing-msg").remove();
                            $('#messages').append(msgStructure(botClass, botName, botMsgContent, botPicturePath));
                            socket.emit(SocketEmitPath, JSON.stringify(data));
                            smoothscroll();	
    
                        }, msgSizeTimer(botMsgContent));
                    }, Math.floor((Math.random() * 6000)));
                }, msgSizeTimer(botMsgContent) * Math.random());
    
            } else {
                setTimeout(function(){
                    $("." + botClass + "-is-typing-msg").remove();
                    $('#messages').append(msgStructure(botClass, botName, botMsgContent, botPicturePath));
                    socket.emit(SocketEmitPath, JSON.stringify(data));
                    smoothscroll();	
                }, msgSizeTimer(botMsgContent));
            };
        }, Math.floor((Math.random() * 5000)));	
    }
    // Functions end here
    
    // Party starts here
        var socket = io();
        var socketBot1
    
        socket.on('message', function(who, data){
            data = JSON.parse(data);
            console.log("Message data von server Bot zu client" + data.type)
    
    
            if (data.type == 'botAnswer') {
    
                fakeItTillYouMakeIt("bot1", who, data.content, "/images/bot_profile_picture/optimized_bot_images/rachel_rationality.png", "callSecondBot", data)
    
    
            } else if (data.type == 'botAnswer2') {
    
                fakeItTillYouMakeIt("bot2", who, data.content, "/images/bot_profile_picture/optimized_bot_images/rachel_rationality.png", "callFirstBot", data)
    
            } else {
    
                let msgStructure =  '<div class="user-msg">' + 
                '<p class="user-msg-name">' + who + '</p>' +
                '<p class="user-msg-text">' + data.content + '</p>' +
                '<p class="user-msg-type">' + data.type + '</p>' +
               '</div>';
    
                $('#messages').append(msgStructure);
            };
        });
    
        $('form').submit(function(){
            var data = {
                "id": socket.id,
                "content": $('#m').val(),
                "type": 'userMessage'
            };
            console.log("What is the name of the first Bot? " + socketBot1)
            socket.send(JSON.stringify(data)); //socket.send sends messages which are received with the 'message' event
            $('#m').val('');
            return false;
        });
    
        $('#stop').click(function(){
            $('#messages').append('<p class="sysmessage">' + 'Verbindung getrennt. ' + '</p>');
            smoothscroll();
    
            socket.disconnect(); // disconnect and stop chat!
    
        });
    
    // Extra: möglichkeit für weiteres Account mit weiteren sets für workspace ids
        $('#setname').click(function(){
            var data = {
                "namebot1": $('#namebot1').val(),
                "username1": $('#username1').val(),
                "password1": $('#password1').val(),
                "workspace_id1": $('#workspace_id1').val(),
                "namebot2": $('#namebot2').val(),
                "username2": $('#username2').val(),
                "password2": $('#password2').val(),
                "workspace_id2": $('#workspace_id2').val(),
                "nickname": $('#nickname').val()
            };
            socket.emit("set_name", JSON.stringify(data));
            console.log("hey" + data);
        });
    
        socket.on('name_set', function(who){
            $('#nameform').hide();
            $('.chat').show();
            $('#messages').append('<p class="sysmessage">' + 'Willkommen im chatbotchat, '+ who + '&nbsp;!' + '</p>');
            smoothscroll();
    
        });
    
    
        
    }); // end jQuery





