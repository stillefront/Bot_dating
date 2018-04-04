//this is the client side of socket.io 


var socket = io();
socket.on ('chat message', function(msg){
    var li = "<li><strong>" + msg.username+": </strong>" + msg.message + "</li>";
    $('.chat-box').append(li);
    $('.chat-box').animate({scrollTop: $('.box-chat').prop('scrollHeight')}, 500);
});

$( document ).ready(function() {
    $('#form-chat').submit(function(event){
        var data = {
            username: $('#username').val(),
            message: $('#text-chat').val()
        };

        if(data.username !== '' && data.message !== '') {
            socket.emit('new message', data);
            $('#text-chat').val('');
        }
        event.preventDefault();
    })
});














/*
$( document ).ready(function() {

    var socket = io();
    console.log("socketClient.js loaded");
});
*/

