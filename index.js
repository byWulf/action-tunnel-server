require('dotenv').config();

const authToken = process.env.AUTH_TOKEN;
if (authToken === undefined) {
    console.error('You did not specify an auth token in your .env file. Please read the readme and fix it.');
    process.exit(1);
}

const port = parseInt(process.env.PORT, 10);
if (port === 0) {
    console.error('You did not specify a port in your .env file. Please read the readme and fix it.');
    process.exit(1);
}

const http = require('http');
const Server = require('socket.io').Server;

const httpServer = http.createServer();
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('New connection - id ' + socket.id);

    if (socket.handshake.auth.token !== authToken) {
        console.log('Wrong token from ' + socket.id);
        socket.emit('auth-error', 'Wrong token');
        socket.disconnect(true);

        return;
    }

    socket.emit('authenticated');

    socket.on('action', (name, payload) => {
        console.log('Distributing action ' + name + ' from ' + socket.id);
        socket.broadcast.emit('action', name, payload);
    });
});

httpServer.listen(port, () => {
    console.log('Listening on *:' + port);
});
