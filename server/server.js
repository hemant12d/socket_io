const express = require('express');
const app = express();
const path = require('path');
const { Server } = require("socket.io");
// const http = require('http');
// const server = http.createServer(app);


const filePath = path.join(__dirname+'./../client/index.html');
app.get('/', (req, res) => {
    res.sendFile(filePath);
});

// Listen express server
const server = app.listen(3000, () => {
    console.log('listening on *:3000');
});

// Initialize a new instance of socket.io by passing the server
const io = new Server(server);
// console.log({io})

// When a user connect to server
io.on('connect', socket=> {
    console.log("User connected !"); // server received the client event

    // Let's client also know that, connection has made with server
    socket.emit('client_connected');

    // listen for client message event from client
    socket.on('chat_message', (data)=> {
        console.log({data});

        // Send welcome message to client
        // socket.emit('welcome', "Thanks for your first message");

        // Broadcast the chat message
        socket.broadcast.emit("chat_message", data);
    });

    // Broadcast the user message

 

    // When client disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const func = (a, b)=> a*b;