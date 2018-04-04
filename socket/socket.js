function socket(io) {

    io.on('connection', function(socket){
        console.log('a user connected lala');
        socket.on('new message', function(msg){
            var data = {
                message: msg.message,
                username: msg.username,
                data: Date.now()
            };

            io.emit('chat message', data);
        });
    });
};

module.exports = socket;