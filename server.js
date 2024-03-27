const localserver = require('./lib/server').server;
const http = require('http');
const socketIo = require('socket.io')

const port = process.env.PORT || 3010;

localserver.run(port);

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello, Socket.IO!</h1>');
});

// Integrate Socket.IO
const io = socketIo(server);

// Set up a connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Example of handling a custom event
  socket.on('myEvent', (data) => {
    console.log(data);
  });

  // Handle the disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
